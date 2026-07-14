let money = 0;
let clickValue = 5.0;

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
    let amountToBuy = (buyMode === 'max') ? Math.min(Math.floor(money / b.price), b.max - b.count) : parseInt(buyMode);
    
    let totalCost = b.price * amountToBuy;
    if (amountToBuy > 0 && money >= totalCost) {
        money -= totalCost;
        b.count += amountToBuy;
        saveGame();
        updateDisplay();
    }
}

function getPassiveIncome() {
    let income = 0;
    for (let key in countryData.buildings) {
        let b = countryData.buildings[key];
        income += b.count * (b.income >= 1 ? b.income : (b.price * b.income));
    }
    return income;
}

function updateDisplay() {
    const moneyElement = document.getElementById('money');
    const incomeElement = document.getElementById('income-display');
    const tbody = document.getElementById('building-body');

    if (moneyElement) moneyElement.innerText = `Pieniądze: ${Math.floor(money).toLocaleString()} zł`;
    if (incomeElement) incomeElement.innerText = `Zarobek: ${Math.floor(getPassiveIncome()).toLocaleString()} zł/s`;
    
    if (tbody) {
        tbody.innerHTML = '';
        for (let key in countryData.buildings) {
            let b = countryData.buildings[key];
            let amountToShow = (buyMode === 'max') ? Math.max(1, Math.min(Math.floor(money / b.price), b.max - b.count)) : buyMode;
            let totalCost = b.price * amountToShow;
            
            tbody.innerHTML += `
                <tr>
                    <td>${b.name}</td>
                    <td>${b.price.toLocaleString()} zł</td>
                    <td>${b.count} / ${b.max}</td>
                    <td><button onclick="buyBuilding('${key}')" ${money < totalCost || b.count >= b.max ? 'disabled' : ''}>
                        Kup ${buyMode === 'max' ? 'Max' : 'x' + buyMode}
                    </button></td>
                </tr>`;
        }
    }
}

function saveGame() { localStorage.setItem('clickerSave', JSON.stringify({money, countryData})); }
function loadGame() {
    let save = JSON.parse(localStorage.getItem('clickerSave'));
    if (save) { money = save.money; countryData = save.countryData; }
}

setInterval(() => { money += getPassiveIncome(); updateDisplay(); }, 1000);

document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    updateDisplay();
    document.getElementById('clickBtn').addEventListener('click', () => {
        money += clickValue;
        updateDisplay();
    });
});
