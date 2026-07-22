window.ET_STORAGE = {
  key: "europe-tycoon-alpha-03",
  load() { try { return JSON.parse(localStorage.getItem(this.key)); } catch { return null; } },
  save(state) { localStorage.setItem(this.key, JSON.stringify(state)); },
  clear() { localStorage.removeItem(this.key); }
};
