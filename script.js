(function() {
    console.log("Skrypt załadowany poprawnie!");

    let money = 0;
    const clickValue = 0.5;
    let prestigePoints = 0;
    let governmentShares = 0;

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

    // --- ZAPIS I WCZYTYWANIE ---
    function saveGame() { 
        localStorage.setItem('clickerSave', JSON.stringify({money, countryData, prestigePoints, governmentShares})); 
    }
    
    function loadGame() {
        let save = JSON.parse(localStorage.getItem('clickerSave'));
        if (save) { 
            money = save.money || 0; 
            countryData = save.countryData || countryData; 
            prestigePoints = save.prestigePoints || 0;
            governmentShares = save.governmentShares || 0;
        }
    }

    // --- LOGIKA GRY ---
    window.setBuyMode = (mode) => { buyMode = mode; updateDisplay(); };

    window.buyBuilding = (type) => {
        let b = countryData.buildings[type];
        let amount = (buyMode === 'max') ? Math.min(Math.floor(money / b.price), b.max - b.count) : parseInt(buyMode);
        if (amount > 0 && money >= b.price * amount) {
            money -= b.price * amount;
            b.count += amount;
            saveGame();
            updateDisplay();
        }
    };

    window.buyShares = () => {
        let cost = 1000000000;
        if (money >= cost) {
            money -= cost;
            governmentShares += 1;
            saveGame();
            updateDisplay();
        }
    };

    window.prestige = () => {
        if (money >= 100000000) {
            prestigePoints += Math.floor(money / 10000000);
            money = 0;
            governmentShares = 0;
            for (let key in countryData.buildings) countryData.buildings[key].count = 0;
            saveGame();
            updateDisplay();
        }
    };

    function getPassiveIncome() {
        let base = Object.values(countryData.buildings).reduce((acc, b) => acc + (b.count * (b.income >= 1 ? b.income : (b.price * b.income))), 0);
        return base * (1 + (governmentShares * 0.1));
    }

    // --- INTERFEJS ---
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
        tbody.innerHTML += `<tr><td colspan="4" style="text-align:center; padding:10px;">
            <button onclick="buyShares()">Kup Udział (1 mld zł) - Posiadasz: ${governmentShares}</button>
            <button onclick="prestige()" style="background-color:red; color:white;">PRESTIŻ (+${Math.floor(money/10000000)} pkt)</button>
        </td></tr>`;
    }

    // --- START ---
    document.getElementById('clickBtn').addEventListener('click', () => { money += clickValue; updateDisplay(); });
    setInterval(() => { money += getPassiveIncome(); updateDisplay(); }, 1000);
    
    loadGame();
    updateDisplay();
})();
