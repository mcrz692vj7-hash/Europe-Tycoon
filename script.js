let money = 0;
let clickValue = 0.5;

let countryData = {
    name: "Polska",
    buildings: {
        smallBusiness: { name: "Mały biznes", count: 0, max: 3800, price: 1000, income: 50 },
        farm: { name: "Farma", count: 0, max: 1900, price: 15000, income: 250 },
        factory: { name: "Fabryka", count: 0, max: 900, price: 75000, income: 0.05 },
        mine: { name: "Kopalnia", count: 0, max: 400, price: 250000, income: 0.05 },
        hotel: { name: "Hotel", count: 0, max: 200, price: 1000000, income: 0.05 },
        powerPlant: { name: "Elektrownia", count: 0, max: 100, price: 20000000, income: 0.05 },
        bank: { name: "Bank", count: 0, max: 10, price: 250000000, income: 0.05 }
    }
};

let buyMode = 1;

function setBuyMode(mode) {
    buyMode = mode;
    document.getElementById('current-mode').innerText = `Aktualnie: x${mode}`;
    updateDisplay();
}

function buyBuilding(type) {
    let b = countryData.buildings[type];
    
    // Obliczamy ile faktycznie możemy kupić w zależności od trybu
    let amountToBuy = buyMode;
    
    if (buyMode === 'max') {
        // Obliczamy max za ile nas stać i ile mamy miejsca do limitu
        let canAfford = Math.floor(money / b.price);
        let canFit = b.max - b.count;
        amountToBuy = Math.min(canAfford, canFit);
    }

    // Sprawdzamy czy nas stać na wybraną ilość
    let totalCost = b.price * amountToBuy;
    
    if (amountToBuy > 0 && money >= totalCost) {
        money -= totalCost;
        b.count += amountToBuy;
        updateDisplay();
        saveGame();
    }
}

// Zmodyfikuj też pętlę w updateDisplay, żeby przycisk "Kup" reagował na buyMode:
// Wewnątrz pętli for w updateDisplay zamień przycisk na ten:
// <button onclick="buyBuilding('${key}')">Kup ${buyMode === 'max' ? 'Max' : 'x' + buyMode}</button>

// 1. ZAPISYWANIE I WCZYTYWANIE (System zapisu)
function saveGame() {
    localStorage.setItem('clickerSave', JSON.stringify({money, countryData}));
}

function loadGame() {
    let save = JSON.parse(localStorage.getItem('clickerSave'));
    if (save) {
        money = save.money;
        countryData = save.countryData;
    }
}

// Obliczanie pasywnego zarobku
function getPassiveIncome() {
    let income = 0;
    for (let key in countryData.buildings) {
        let b = countryData.buildings[key];
        if (b.income >= 1) income += b.count * b.income;
        else income += b.count * (b.price * b.income);
    }
    return income;
}

// Pętla główna (zapis + zysk)
setInterval(() => {
    money += getPassiveIncome();
    saveGame(); // Automatyczny zapis co sekundę
    updateDisplay();
}, 1000);

function updateDisplay() {
    // Sprawdź czy element istnieje w HTML
    const moneyElement = document.getElementById('money');
    const incomeElement = document.getElementById('income-display');
    const tbody = document.getElementById('building-body');

    if (moneyElement) moneyElement.innerText = `Pieniądze: ${Math.floor(money).toLocaleString()} zł`;
    if (incomeElement) incomeElement.innerText = `Zarobek: ${Math.floor(getPassiveIncome()).toLocaleString()} zł/s`;
    
    if (tbody) {
        tbody.innerHTML = '';
        for (let key in countryData.buildings) {
            let b = countryData.buildings[key];
            // Używamy toLocaleString tylko na liczbach
            tbody.innerHTML += `
                <tr>
                    <td>${b.name}</td>
                    <td>${b.price.toLocaleString()} zł</td>
                    <td>${b.count} / ${b.max}</td>
                    <td><button onclick="buyBuilding('${key}')" ${money < b.price || b.count >= b.max ? 'disabled' : ''}>Kup</button></td>
                </tr>
            `;
        }
    }
}

function buyBuilding(type) {
    let b = countryData.buildings[type];
    if (money >= b.price && b.count < b.max) {
        money -= b.price;
        b.count++;
        updateDisplay();
    }
}

// Przy starcie wczytaj dane
loadGame();
updateDisplay();

// Podłączenie funkcji do przycisku klikania
document.addEventListener('DOMContentLoaded', () => {
    const clickBtn = document.getElementById('clickBtn');
    if (clickBtn) {
        clickBtn.onclick = () => {
            money += clickValue;
            updateDisplay();
            saveGame(); // Automatyczny zapis po każdym kliknięciu
        };
    }
});

// Usuwamy stare próby podpięcia i robimy to bezpośrednio
document.getElementById('clickBtn').addEventListener('click', function() {
    money += clickValue;
    console.log("Dodano pieniądze, nowa suma: " + money); // Zobaczysz to w konsoli F12
    updateDisplay();
});
