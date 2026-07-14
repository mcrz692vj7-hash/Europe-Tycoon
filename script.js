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

// Logika pasywnego zarobku co sekundę
setInterval(() => {
    let passiveIncome = 0;
    for (let key in countryData.buildings) {
        let b = countryData.buildings[key];
        if (b.income >= 1) {
            passiveIncome += b.count * b.income;
        } else {
            passiveIncome += b.count * (b.price * b.income);
        }
    }
    money += passiveIncome;
    updateDisplay();
}, 1000);

function updateDisplay() {
    document.getElementById('money').innerText = `Pieniądze: ${money.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} zł`;
    const tbody = document.getElementById('building-body');
    tbody.innerHTML = '';
    
    for (let key in countryData.buildings) {
        let b = countryData.buildings[key];
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

document.getElementById('clickBtn').onclick = () => {
    money += clickValue;
    updateDisplay();
};

function buyBuilding(type) {
    let b = countryData.buildings[type];
    if (money >= b.price && b.count < b.max) {
        money -= b.price;
        b.count++;
        updateDisplay();
    }
}

// Inicjalizacja wyświetlania przy starcie
updateDisplay();
