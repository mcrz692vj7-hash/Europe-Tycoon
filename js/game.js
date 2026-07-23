(() => {
  const { buildings, clickUpgrades, countries } = window.ET_DATA;

  // Tworzy pusty obiekt budynków (wszystkie po 0) dla danego kraju
  const createEmptyBuildings = () => Object.fromEntries(buildings.map(b => [b.id, 0]));

  const initialState = () => {
    const unlocked = Object.keys(countries).filter(id => countries[id].unlocked);
    const countryBuildings = {};
    Object.keys(countries).forEach(id => {
      countryBuildings[id] = createEmptyBuildings();
    });

    return {
      version: window.ET_DATA.version,
      language: "pl",
      cash: 0,
      clickPower: 0.5,
      selectedQuantity: 1,
      activeCountry: window.ET_DATA.activeCountry || "poland",
      unlockedCountries: unlocked,
      countryBuildings: countryBuildings, // Osobne budynki dla każdego kraju!
      upgrades: [],
      stats: { clicks: 0, earned: 0, buildingsBought: 0, bestCash: 0, playSeconds: 0 },
      lastSavedAt: Date.now()
    };
  };

  class Game {
    constructor() {
      this.state = this.hydrate(window.ET_STORAGE.load());
      this.applyOfflineIncome();
    }

    hydrate(saved) {
      const base = initialState();
      if (!saved || saved.version !== base.version) return base;

      // Migracja starego zapisu
      let restoredBuildings = base.countryBuildings;
      if (saved.countryBuildings) {
        Object.keys(base.countryBuildings).forEach(cId => {
          restoredBuildings[cId] = {
            ...base.countryBuildings[cId],
            ...(saved.countryBuildings[cId] || {})
          };
        });
      } else if (saved.buildings) {
        // Przeniesienie dotychczasowych budynków do Polski
        restoredBuildings.poland = { ...base.countryBuildings.poland, ...saved.buildings };
      }

      return {
        ...base,
        ...saved,
        activeCountry: saved.activeCountry || base.activeCountry,
        unlockedCountries: Array.isArray(saved.unlockedCountries) ? saved.unlockedCountries : base.unlockedCountries,
        countryBuildings: restoredBuildings,
        upgrades: Array.isArray(saved.upgrades) ? saved.upgrades : [],
        stats: { ...base.stats, ...saved.stats }
      };
    }

    get currentCountry() {
      return countries[this.state.activeCountry] || countries.poland;
    }

    // Posiadane budynki w AKTYWNYM kraju
    get currentBuildings() {
      if (!this.state.countryBuildings[this.state.activeCountry]) {
        this.state.countryBuildings[this.state.activeCountry] = Object.fromEntries(buildings.map(b => [b.id, 0]));
      }
      return this.state.countryBuildings[this.state.activeCountry];
    }

    // Oblicza limit budynku proporcjonalnie do populacji kraju
    getBuildingLimit(building, countryId = this.state.activeCountry) {
      const countryConfig = countries[countryId];
      if (!countryConfig || !countryConfig.populationNum) return building.limit || 100;
      
      const calculatedLimit = Math.round(countryConfig.populationNum * building.baseLimitPerMillion);
      return Math.max(1, calculatedLimit); // Co najmniej 1 budynek
    }

    // Łączny dochód ze WSZYSTKICH odblokowanych krajów jednocześnie!
    get incomePerSecond() {
      let totalIncome = 0;

      this.state.unlockedCountries.forEach(countryId => {
        const countryConfig = countries[countryId];
        const countryBldgs = this.state.countryBuildings[countryId];
        if (!countryConfig || !countryBldgs) return;

        buildings.forEach(b => {
          const owned = countryBldgs[b.id] || 0;
          if (owned > 0) {
            const multiplier = (countryConfig.bonus && countryConfig.bonus.building === b.id) ? countryConfig.bonus.multiplier : 1;
            totalIncome += owned * (b.income * multiplier);
          }
        });
      });

      return totalIncome;
    }

    // Dochód z konkretnego budynku w AKTYWNYM kraju
    getBuildingIncome(building) {
      const countryBonus = this.currentCountry.bonus;
      const multiplier = (countryBonus && countryBonus.building === building.id) ? countryBonus.multiplier : 1;
      return building.income * multiplier;
    }

    get completion() {
      const owned = buildings.reduce((sum, b) => sum + this.currentBuildings[b.id], 0);
      const limits = buildings.reduce((sum, b) => sum + this.getBuildingLimit(b), 0);
      return (owned / limits) * 100;
    }

    isBuildingUnlocked(building) {
      return !building.unlock || this.currentBuildings[building.unlock.building] >= building.unlock.amount;
    }

    unlockedBuildingCount() {
      return buildings.filter(building => this.isBuildingUnlocked(building)).length;
    }

    buyCountryLicense(countryId) {
      const targetCountry = countries[countryId];
      if (!targetCountry) return { ok: false, reason: "notFound" };

      if (this.state.unlockedCountries.includes(countryId)) {
        this.state.activeCountry = countryId;
        return { ok: true, action: "switched" };
      }

      if (this.state.cash < targetCountry.licenseCost) {
        return { ok: false, reason: "cash", cost: targetCountry.licenseCost };
      }

      this.state.cash -= targetCountry.licenseCost;
      this.state.unlockedCountries.push(countryId);

      // Inicjalizacja pustej listy budynków dla nowego kraju
      if (!this.state.countryBuildings[countryId]) {
        this.state.countryBuildings[countryId] = Object.fromEntries(buildings.map(b => [b.id, 0]));
      }

      this.state.activeCountry = countryId;
      this.save();

      return { ok: true, action: "unlocked", countryName: targetCountry.name };
    }

    addCash(amount) {
      this.state.cash += amount;
      this.state.stats.earned += amount;
      this.state.stats.bestCash = Math.max(this.state.stats.bestCash, this.state.cash);
    }

    click() {
      this.addCash(this.state.clickPower);
      this.state.stats.clicks++;
    }

    tick(seconds) {
      if (seconds <= 0) return;
      this.addCash(this.incomePerSecond * seconds);
      this.state.stats.playSeconds += seconds;
    }

    applyOfflineIncome() {
      const seconds = Math.min(14400, Math.max(0, (Date.now() - this.state.lastSavedAt) / 1000));
      const earned = this.incomePerSecond * seconds;
      if (earned > 0.01) this.addCash(earned);
      this.offlineEarned = earned;
    }

    purchasable(building, mode) {
      const limit = this.getBuildingLimit(building);
      const remaining = limit - this.currentBuildings[building.id];
      const affordable = Math.floor((this.state.cash + 1e-8) / building.cost);
      const requested = mode === "max" ? Infinity : Number(mode);
      return Math.max(0, Math.min(remaining, affordable, requested));
    }

    buyBuilding(id) {
      const b = buildings.find(item => item.id === id);
      if (!this.isBuildingUnlocked(b)) return { ok: false, reason: "locked" };
      
      const limit = this.getBuildingLimit(b);
      const qty = this.purchasable(b, this.state.selectedQuantity);
      if (!qty) return { ok: false, reason: this.currentBuildings[id] >= limit ? "limit" : "cash" };

      this.state.cash -= qty * b.cost;
      this.currentBuildings[id] += qty; // Dodaje do aktywnego kraju!
      this.state.stats.buildingsBought += qty;
      return { ok: true, qty };
    }

    buyUpgrade(id) {
      const upgrade = clickUpgrades.find(item => item.id === id);
      if (!upgrade || this.state.upgrades.includes(id)) return { ok: false };
      if (this.state.cash < upgrade.cost) return { ok: false, reason: "cash" };
      this.state.cash -= upgrade.cost;
      this.state.clickPower = upgrade.amount;
      this.state.upgrades.push(id);
      return { ok: true };
    }

    setLanguage(language) { this.state.language = language; }
    setQuantity(quantity) { this.state.selectedQuantity = quantity === "max" ? "max" : Number(quantity); }

    save() {
      this.state.lastSavedAt = Date.now();
      window.ET_STORAGE.save(this.state);
    }
  }

  window.ET_Game = Game;
})();
