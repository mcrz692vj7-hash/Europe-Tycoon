(function() {
    let money = 0;
    let baseClickValue = 0.5;
    let clickUpgrades = 0; 
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

    // --- LOGIKA ---
    function getClickValue() {
        return baseClickValue + (clickUpgrades * 20);
    }

    function getPassiveIncome() {
        let base = Object.values(countryData.buildings).reduce((acc, b) => acc + (b.count * (b.income >= 1 ? b.income : (b.price * b.income))), 0);
        let prestigeBonus = 1 + (prestigePoints * 0.05); // +5% za punkt
        let sharesBonus = 1 + (governmentShares * 0.1);  // +10% za udział
        return base * prestigeBonus * sharesBonus;
    }

    // --- FUNKCJE GLOBALNE ---
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

    window.upgradeClick = () => {
        let cost = 5000 * (clickUpgrades + 1);
        if (clickUpgrades < 50 && money >= cost) {
            money -= cost;
            clickUpgrades++;
            saveGame();
            updateDisplay();
        }
    };

    window.buyShares = () => {
        if (governmentShares < 100 && money >= 1000000000) {
            money -= 1000000000;
            governmentShares++;
            saveGame();
            updateDisplay();
        }
    };

    window.prestige = () => {
        if (money >= 100000000) {
            prestigePoints += 1;
            money = 0;
            governmentShares = 0;
            clickUpgrades = 0;
            for (let key in countryData.buildings) countryData.buildings[key].count = 0;
            saveGame();
            updateDisplay();
        }
    };

    // --- ZAPIS / WCZYTYWANIE ---
    function saveGame() { 
        localStorage.setItem('clickerSave', JSON.stringify({money, countryData, prestigePoints, governmentShares, clickUpgrades})); 
    }
    
    function loadGame() {
        let save = JSON.parse(localStorage.getItem('clickerSave'));
        if (save) { 
            money = save.money || 0; 
            countryData = save.countryData || countryData; 
            prestigePoints = save.prestigePoints || 0;
            governmentShares = save.governmentShares || 0;
            clickUpgrades = save.clickUpgrades || 0;
        }
    }

    // --- UI ---
    function updateDisplay() {
        document.getElementById('money').innerText = `Pieniądze: ${Math.floor(money).toLocaleString()} zł`;
        document.getElementById('income-display').innerText = `Zarobek: ${Math.floor(getPassiveIncome()).toLocaleString()} zł/s`;
        
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
                    Kup
                </button></td>
            </tr>`;
        }

        tbody.innerHTML += `<tr><td colspan="4" style="text-align:center; padding:10px;">
            <p><strong>Bonusy:</strong> Prestiż (+${prestigePoints * 5}%) | Udziały (+${governmentShares * 10}%)</p>
            <button onclick="upgradeClick()" ${clickUpgrades >= 50 ? 'disabled' : ''}>Klik (+20zł/lvl, ${clickUpgrades}/50)</button>
            <button onclick="buyShares()" ${governmentShares >= 100 ? 'disabled' : ''}>Udział (1 mld, ${governmentShares}/100)</button>
            <button onclick="prestige()" style="background-color:red; color:white;" ${money < 100000000 ? 'disabled' : ''}>
                RESET (Prestiż +1)
            </button>
        </td></tr>`;
    }

    document.getElementById('clickBtn').addEventListener('click', () => { money += getClickValue(); updateDisplay(); });
    setInterval(() => { money += getPassiveIncome(); updateDisplay(); }, 1000);
    
    loadGame();
    updateDisplay();
})();
