(function() {
    console.log("Skrypt załadowany poprawnie!");

    let money = 0;
    const clickValue = 0.5;

    let prestigePoints = 0; // Punkty za reset
let governmentShares = 0; // Udziały (procent bonusu)

    let countryData = {
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

    // Funkcje globalne (wystawione na window, żeby HTML je widział)
    window.setBuyMode = function(mode) {
        buyMode = mode;
        updateDisplay();
    };

    window.buyBuilding = function(type) {
        let b = countryData.buildings[type];
        let amount = (buyMode === 'max') ? Math.min(Math.floor(money / b.price), b.max - b.count) : parseInt(buyMode);
        
        if (amount > 0 && money >= b.price * amount) {
            money -= b.price * amount;
            b.count += amount;
            saveGame();
            updateDisplay();
        }
    };

    function getPassiveIncome() {
        return Object.values(countryData.buildings).reduce((acc, b) => acc + (b.count * (b.income >= 1 ? b.income : (b.price * b.income))), 0);
    }

    function updateDisplay() {
        document.getElementById('money').innerText = `Pieniądze: ${Math.floor(money).toLocaleString()} zł`;
        document.getElementById('income-display').innerText = `Zarobek: ${Math.floor(getPassiveIncome()).toLocaleString()} zł/s`;
        document.getElementById('current-mode').innerText = `Aktualnie: x${buyMode}`;

        const tbody = document.getElementById('building-body');
        tbody.innerHTML = '';
        
        for (let [key, b] of Object.entries(countryData.buildings)) {
            let amount = (buyMode === 'max') ? Math.max(1, Math.min(Math.floor(money / b.price), b.max - b.count)) : buyMode;
            let cost = b.price * amount;
            tbody.innerHTML += `<tr>
                <td>${b.name}</td>
                <td>${b.price.toLocaleString()} zł</td>
                <td>${b.count} / ${b.max}</td>
                <td><button onclick="buyBuilding('${key}')" ${money < cost || b.count >= b.max ? 'disabled' : ''}>
                    Kup ${buyMode === 'max' ? 'Max' : 'x' + buyMode}
                </button></td>
            </tr>`;
        }
    }

    function saveGame() { localStorage.setItem('clickerSave', JSON.stringify({money, countryData})); }
    
    function loadGame() {
        let save = JSON.parse(localStorage.getItem('clickerSave'));
        if (save) { money = save.money; countryData = save.countryData; }
    }

    // Inicjalizacja
    loadGame();
    document.getElementById('clickBtn').addEventListener('click', () => {
        money += clickValue;
        updateDisplay();
    });
    setInterval(() => { money += getPassiveIncome(); updateDisplay(); }, 1000);
    updateDisplay();
})();
