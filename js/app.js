(() => {
  const game = new window.ET_Game(); const ui = new window.ET_UI(game); let previous = performance.now(); let resetInProgress = false;
  const saveStatus = document.querySelector('#saveStatus');
  ui.render();
  if (game.offlineEarned > .01) ui.toast(`${ui.t("offlineGain")}: +${ui.money(game.offlineEarned)}`);
  document.querySelector('#clickButton').addEventListener('click', event => { game.click(); ui.spawnClick(game.state.clickPower, event); ui.renderSummary(); ui.renderUpgrades(); });
  document.querySelectorAll('[data-quantity]').forEach(button => button.addEventListener('click', () => { game.setQuantity(button.dataset.quantity); ui.render(); }));
  document.querySelector('#languageButton').addEventListener('click', () => { game.setLanguage(game.state.language === "pl" ? "en" : "pl"); ui.render(); });
  document.querySelector('#resetButton').addEventListener('click', () => { if (!confirm(ui.t("resetConfirm"))) return; resetInProgress = true; window.ET_STORAGE.clear(); location.reload(); });
  setInterval(() => { const now = performance.now(); game.tick((now - previous) / 1000); previous = now; ui.renderSummary(); ui.renderBuildings(); ui.renderUpgrades(); }, 1000);
  setInterval(() => { game.save(); saveStatus.textContent = ui.t("saved"); setTimeout(() => saveStatus.textContent = ui.t("saving"), 1500); }, 5000);
  window.addEventListener('beforeunload', () => { if (!resetInProgress) game.save(); });
})();
