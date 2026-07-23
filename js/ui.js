(() => {
  class UI {
    constructor(game) {
      this.game = game;
      this.$ = selector => document.querySelector(selector);
      this.$$ = selector => [...document.querySelectorAll(selector)];
    }

    t(key) {
      return (window.ET_I18N[this.game.state.language] || window.ET_I18N.pl)[key] || key;
    }

    money(value) {
      return new Intl.NumberFormat(this.game.state.language === "pl" ? "pl-PL" : "en-US", {
        style: "currency",
        currency: "PLN",
        maximumFractionDigits: value < 100 ? 2 : 0
      }).format(value);
    }

    number(value) {
      return new Intl.NumberFormat(this.game.state.language === "pl" ? "pl-PL" : "en-US", {
        maximumFractionDigits: 0
      }).format(value);
    }

    time(total) {
      const h = Math.floor(total / 3600), m = Math.floor(total % 3600 / 60), s = Math.floor(total % 60);
      return h ? `${h}h ${m}m` : `${m}m ${s}s`;
    }

    translate() {
      document.documentElement.lang = this.game.state.language;
      this.$$('[data-i18n]').forEach(el => el.textContent = this.t(el.dataset.i18n));
      this.$$('[data-i18n-title]').forEach(el => el.title = this.t(el.dataset.i18nTitle));
      this.$('#languageButton').textContent = this.game.state.language === "pl" ? "PL" : "EN";
    }

    renderCountryBanner() {
      const country = this.game.currentCountry;
      const banner = this.$('.country-banner');
      if (!banner) return;

      const flagEl = banner.querySelector('.flag');
      if (flagEl) flagEl.textContent = country.flag;

      const nameEl = banner.querySelector('.country-title h1');
      if (nameEl) nameEl.textContent = country.name;

      const dataDivs = banner.querySelectorAll('.country-data strong');
      if (dataDivs.length >= 3) {
        dataDivs[0].textContent = country.population || "—";
        dataDivs[1].textContent = country.gdp || "—";
        dataDivs[2].textContent = country.bonus ? country.bonus.text : "—";
      }
    }

    renderBuildings() {
      const list = this.$('#buildingList');
      const { buildings } = window.ET_DATA;

      list.innerHTML = buildings.map(b => {
        // Obliczanie limitu dopasowanego do populacji aktywnego kraju
        const limit = this.game.getBuildingLimit(b);
        const owned = this.game.currentBuildings[b.id],
              income = this.game.getBuildingIncome(b),
              unlocked = this.game.isBuildingUnlocked(b),
              buyable = unlocked ? this.game.purchasable(b, this.game.state.selectedQuantity) : 0,
              totalCost = buyable * b.cost;

        const disabled = buyable === 0 ? "disabled" : "";
        const requirement = b.unlock ? `${this.t("unlockRequirement")}: ${this.number(b.unlock.amount)} × ${this.t(window.ET_DATA.buildings.find(item => item.id === b.unlock.building).nameKey)}` : "";

        return `<article class="building-card ${owned >= limit ? "is-complete" : ""} ${!unlocked ? "is-locked" : ""}"><div class="building-icon">${b.icon}</div><div class="building-info"><h3>${this.t(b.nameKey)}</h3><p>${unlocked ? this.t(b.descriptionKey) : `🔒 ${requirement}`}</p><div class="building-meta"><span>${this.t("income")}: <strong>+${this.money(income)}${this.t("perSecond")}</strong></span><span>${this.t("owned")}: <strong>${this.number(owned)} / ${this.number(limit)}</strong></span></div></div><div class="building-buy"><span>${unlocked ? this.t("cost") : this.t("locked")}</span><strong>${unlocked ? (buyable ? this.money(totalCost) : this.money(b.cost)) : "—"}</strong><small>${unlocked ? (buyable > 1 ? `${this.t("buy")} ×${this.number(buyable)}` : `${this.t("buy")} ×1`) : requirement}</small><button type="button" data-building="${b.id}" ${disabled}>${unlocked ? this.t("buy") : this.t("locked")}</button></div></article>`;
      }).join("");

      this.$$('[data-building]').forEach(button => button.addEventListener('click', () => this.onBuyBuilding(button.dataset.building)));
    }

    renderUpgrades() {
      const list = this.$('#upgradeList');
      const upgrades = window.ET_DATA.clickUpgrades;
      list.innerHTML = upgrades.map((u, index) => {
        const owned = this.game.state.upgrades.includes(u.id);
        const previousOwned = index === 0 || this.game.state.upgrades.includes(upgrades[index - 1].id);
        const disabled = owned || !previousOwned || this.game.state.cash < u.cost;
        return `<article class="upgrade-card ${owned ? "owned" : ""}"><div><strong>${this.money(u.amount)}</strong><span>${this.t("clickTarget")}</span></div><button type="button" data-upgrade="${u.id}" ${disabled}>${owned ? this.t("upgradeOwned") : `${this.t("setClickPower")} ${this.money(u.amount)} · ${this.money(u.cost)}`}</button></article>`;
      }).join("");
      this.$$('[data-upgrade]').forEach(button => button.addEventListener('click', () => this.onBuyUpgrade(button.dataset.upgrade)));
      this.$('#upgradeLevel').textContent = `${this.game.state.upgrades.length} / ${upgrades.length}`;
    }

    renderSummary() {
      const state = this.game.state;
      this.$('#cashValue').textContent = this.money(state.cash);
      this.$('#incomeValue').textContent = `+${this.money(this.game.incomePerSecond)}${this.t("perSecond")}`;
      this.$('#clickValue').textContent = `+${this.money(state.clickPower)}`;
      this.$('#clickButtonValue').textContent = `+${this.money(state.clickPower)}`;
      this.$('#playTimeValue').textContent = this.time(state.stats.playSeconds);

      this.$('#completionText').textContent = `${this.game.completion.toFixed(2)}%`;
      this.$('#completionBar').style.width = `${Math.min(100, this.game.completion)}%`;

      const unlocked = this.game.unlockedBuildingCount();
      this.$('#unlockedBuildings').textContent = `${unlocked} / ${window.ET_DATA.buildings.length}`;
      this.$('#developmentStage').textContent = unlocked;
      const next = window.ET_DATA.buildings.find(building => !this.game.isBuildingUnlocked(building));
      this.$('#nextUnlockText').textContent = next ? `${this.t("nextGoal")}: ${this.t(next.nameKey)}` : this.t("unlocked");

      this.$('#totalClicks').textContent = this.number(state.stats.clicks);
      this.$('#totalEarned').textContent = this.money(state.stats.earned);
      this.$('#buildingsBought').textContent = this.number(state.stats.buildingsBought);
      this.$('#bestCash').textContent = this.money(state.stats.bestCash);

      this.$('#purchaseNote').textContent = `${this.t("buyMode")}: ${state.selectedQuantity === "max" ? this.t("max") : `×${state.selectedQuantity}`}`;
      this.$$('[data-quantity]').forEach(button => button.classList.toggle('selected', String(this.game.state.selectedQuantity) === button.dataset.quantity));
    }

    renderMap() {
      const countries = window.ET_DATA.countries;
      const currentCountry = this.game.currentCountry;

      const nextId = currentCountry.nextLicense;
      const nextCountry = nextId ? countries[nextId] : null;
      const licenseCard = this.$('.license-card');

      if (licenseCard) {
        if (nextCountry && !this.game.state.unlockedCountries.includes(nextId)) {
          licenseCard.style.display = "flex";
          this.$('#licenseFlag').textContent = nextCountry.flag;
          this.$('#licenseName').textContent = nextCountry.name;
          this.$('#licenseCost').textContent = this.money(nextCountry.licenseCost);
          licenseCard.onclick = () => this.onCountryClick(nextId);
        } else {
          licenseCard.style.display = "none";
        }
      }

      this.$$('.country-shape').forEach(shape => {
        const countryId = shape.dataset.country;
        const country = countries[countryId];
        if (!country) return;

        const isUnlocked = this.game.state.unlockedCountries.includes(countryId);
        const isActive = this.game.state.activeCountry === countryId;

        shape.classList.toggle('active', isActive);
        shape.classList.toggle('locked', !isUnlocked);

        shape.onclick = () => this.onCountryClick(countryId);
      });

      this.$('#mapSelection').textContent = `${currentCountry.flag} ${currentCountry.name} — ${this.t("activeCountry") || "aktywny kraj"}`;
    }

    onCountryClick(countryId) {
      const country = window.ET_DATA.countries[countryId];
      if (!country) return;

      const result = this.game.buyCountryLicense(countryId);

      if (result.ok) {
        if (result.action === "unlocked") {
          this.toast(`🎉 ${this.t("unlocked")}: ${country.flag} ${country.name}!`);
        } else {
          this.toast(`${country.flag} ${country.name}`);
        }
      } else {
        if (result.reason === "cash") {
          this.toast(`🔒 ${country.name}: ${this.t("insufficientFunds")} (${this.money(result.cost)})`);
        } else {
          this.toast(`${country.flag} ${country.name}: ${this.t("mapLocked")}`);
        }
      }
      this.render();
    }

    render() {
      this.translate();
      this.renderCountryBanner();
      this.renderSummary();
      this.renderBuildings();
      this.renderUpgrades();
      this.renderMap();
    }

    toast(message) {
      const el = this.$('#toast');
      el.textContent = message;
      el.classList.add('show');
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
    }

    spawnClick(amount, event) {
      const area = this.$('#clickArea');
      const el = document.createElement('b');
      el.className = 'floating-cash';
      el.textContent = `+${this.money(amount)}`;
      const rect = area.getBoundingClientRect();
      const x = event ? event.clientX - rect.left : rect.width / 2;
      el.style.left = `${Math.max(20, Math.min(rect.width - 80, x))}px`;
      area.append(el);
      setTimeout(() => el.remove(), 900);
    }

    onBuyBuilding(id) {
      const result = this.game.buyBuilding(id);
      if (!result.ok) {
        this.toast(this.t(result.reason === "limit" ? "limitReached" : result.reason === "locked" ? "lockedBuilding" : "insufficientFunds"));
        return;
      }
      this.toast(`${this.t("bought")}: ×${this.number(result.qty)}`);
      this.render();
    }

    onBuyUpgrade(id) {
      const result = this.game.buyUpgrade(id);
      if (!result.ok) {
        this.toast(this.t("insufficientFunds"));
        return;
      }
      this.render();
    }
  }

  window.ET_UI = UI;
})();
