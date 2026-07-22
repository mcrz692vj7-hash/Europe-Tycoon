(() => {
  const { buildings, clickUpgrades, country } = window.ET_DATA;
  const initialState = () => ({ version: window.ET_DATA.version, language: "pl", cash: 0, clickPower: .5, selectedQuantity: 1, buildings: Object.fromEntries(buildings.map(b => [b.id, 0])), upgrades: [], stats: { clicks: 0, earned: 0, buildingsBought: 0, bestCash: 0, playSeconds: 0 }, lastSavedAt: Date.now() });
  class Game {
    constructor() { this.state = this.hydrate(window.ET_STORAGE.load()); this.applyOfflineIncome(); }
    hydrate(saved) { const base = initialState(); if (!saved || saved.version !== base.version) return base; return { ...base, ...saved, buildings: { ...base.buildings, ...saved.buildings }, upgrades: Array.isArray(saved.upgrades) ? saved.upgrades : [], stats: { ...base.stats, ...saved.stats } }; }
    get incomePerSecond() { return buildings.reduce((sum, b) => sum + this.state.buildings[b.id] * this.getBuildingIncome(b), 0); }
    getBuildingIncome(building) { return building.income * (building.id === country.bonus.building ? country.bonus.multiplier : 1); }
    get completion() { const owned = buildings.reduce((sum, b) => sum + this.state.buildings[b.id], 0); const limits = buildings.reduce((sum, b) => sum + b.limit, 0); return owned / limits * 100; }
    isBuildingUnlocked(building) { return !building.unlock || this.state.buildings[building.unlock.building] >= building.unlock.amount; }
    unlockedBuildingCount() { return buildings.filter(building => this.isBuildingUnlocked(building)).length; }
    addCash(amount) { this.state.cash += amount; this.state.stats.earned += amount; this.state.stats.bestCash = Math.max(this.state.stats.bestCash, this.state.cash); }
    click() { this.addCash(this.state.clickPower); this.state.stats.clicks++; }
    tick(seconds) { if (seconds <= 0) return; this.addCash(this.incomePerSecond * seconds); this.state.stats.playSeconds += seconds; }
    applyOfflineIncome() { const seconds = Math.min(14400, Math.max(0, (Date.now() - this.state.lastSavedAt) / 1000)); const earned = this.incomePerSecond * seconds; if (earned > .01) this.addCash(earned); this.offlineEarned = earned; }
    purchasable(building, mode) { const remaining = building.limit - this.state.buildings[building.id]; const affordable = Math.floor((this.state.cash + 1e-8) / building.cost); const requested = mode === "max" ? Infinity : Number(mode); return Math.max(0, Math.min(remaining, affordable, requested)); }
    buyBuilding(id) { const b = buildings.find(item => item.id === id); if (!this.isBuildingUnlocked(b)) return { ok:false, reason:"locked" }; const qty = this.purchasable(b, this.state.selectedQuantity); if (!qty) return { ok:false, reason: this.state.buildings[id] >= b.limit ? "limit" : "cash" }; this.state.cash -= qty * b.cost; this.state.buildings[id] += qty; this.state.stats.buildingsBought += qty; return { ok:true, qty }; }
    buyUpgrade(id) { const upgrade = clickUpgrades.find(item => item.id === id); if (!upgrade || this.state.upgrades.includes(id)) return { ok:false }; if (this.state.cash < upgrade.cost) return { ok:false, reason:"cash" }; this.state.cash -= upgrade.cost; this.state.clickPower = upgrade.amount; this.state.upgrades.push(id); return { ok:true }; }
    setLanguage(language) { this.state.language = language; }
    setQuantity(quantity) { this.state.selectedQuantity = quantity === "max" ? "max" : Number(quantity); }
    save() { this.state.lastSavedAt = Date.now(); window.ET_STORAGE.save(this.state); }
  }
  window.ET_Game = Game;
})();
