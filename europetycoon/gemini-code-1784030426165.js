let money = 0;
let clickValue = 0.5;
const PRICE_GROWTH = 1.01; // Tu zmieniasz mnożnik cen!

let buildings = {
    farma: { count: 0, basePrice: 10, currentPrice: 10 }
};

// Funkcja klikania
document.getElementById('clickBtn').onclick = () => {
    money += clickValue;
    updateDisplay();
};

// Funkcja kupowania
function buyBuilding(type) {
    let b = buildings[type];
    if (money >= b.currentPrice) {
        money -= b.currentPrice;
        b.count++;
        // Nowa cena = stara cena * mnożnik
        b.currentPrice = b.basePrice * Math.pow(PRICE_GROWTH, b.count);
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById('money').innerText = `Pieniądze: ${money.toFixed(2)} zł`;
    document.getElementById('farma-count').innerText = buildings.farma.count;
}