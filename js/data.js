window.ET_DATA = {
  version: "0.3.0-part-2",
  activeCountry: "poland",
  countries: {
    poland: {
      id: "poland",
      name: "Polska",
      nameKey: "poland",
      flag: "🇵🇱",
      populationNum: 37.5, // w milionach
      population: "37.5M",
      gdp: "€0.9T",
      unlocked: true,
      licenseCost: 0,
      nextLicense: "czechia",
      bonus: { building: "farm", multiplier: 1.10, text: "+10% 🌾" }
    },
    czechia: {
      id: "czechia",
      name: "Czechy",
      nameKey: "czechia",
      flag: "🇨🇿",
      populationNum: 10.9, // w milionach
      population: "10.9M",
      gdp: "€0.3T",
      unlocked: false,
      licenseCost: 10000000,
      nextLicense: "germany",
      bonus: { building: "factory", multiplier: 1.15, text: "+15% 🏭" }
    },
    germany: { id: "germany", name: "Niemcy", flag: "🇩🇪", populationNum: 84.4, population: "84.4M", unlocked: false, licenseCost: 100000000, nextLicense: "france" },
    france: { id: "france", name: "Francja", flag: "🇫🇷", populationNum: 68.1, population: "68.1M", unlocked: false, licenseCost: 1000000000, nextLicense: null },
    norway: { id: "norway", name: "Norwegia", flag: "🇳🇴", populationNum: 5.5, population: "5.5M", unlocked: false, licenseCost: 500000000, nextLicense: null },
    italy: { id: "italy", name: "Włochy", flag: "🇮🇹", populationNum: 58.9, population: "58.9M", unlocked: false, licenseCost: 750000000, nextLicense: null },
    spain: { id: "spain", name: "Hiszpania", flag: "🇪🇸", populationNum: 48.1, population: "48.1M", unlocked: false, licenseCost: 800000000, nextLicense: null }
  },
  // Bazy limitów ustalone pod Polskę (37.5M):
  buildings: [
    { id: "smallBusiness", icon: "🏪", nameKey: "smallBusiness", descriptionKey: "smallBusinessDesc", cost: 25, income: 1, baseLimitPerMillion: 100 },  // ~3800 dla PL, ~1090 dla CZ
    { id: "farm", icon: "🌾", nameKey: "farm", descriptionKey: "farmDesc", cost: 250, income: 8, baseLimitPerMillion: 50, unlock: { building: "smallBusiness", amount: 5 } },             // ~1900 dla PL, ~552 dla CZ
    { id: "factory", icon: "🏭", nameKey: "factory", descriptionKey: "factoryDesc", cost: 3000, income: 55, baseLimitPerMillion: 24, unlock: { building: "farm", amount: 20 } },              // ~900 dla PL, ~261 dla CZ
    { id: "mine", icon: "⛏️", nameKey: "mine", descriptionKey: "mineDesc", cost: 25000, income: 340, baseLimitPerMillion: 10, unlock: { building: "factory", amount: 10 } },          // ~400 dla PL, ~116 dla CZ
    { id: "hotel", icon: "🏨", nameKey: "hotel", descriptionKey: "hotelDesc", cost: 175000, income: 2100, baseLimitPerMillion: 5, unlock: { building: "mine", amount: 10 } },           // ~200 dla PL, ~58 dla CZ
    { id: "powerPlant", icon: "⚡", nameKey: "powerPlant", descriptionKey: "powerPlantDesc", cost: 1000000, income: 12000, baseLimitPerMillion: 2, unlock: { building: "hotel", amount: 5 } }, // ~100 dla PL, ~29 dla CZ
    { id: "bank", icon: "🏦", nameKey: "bank", descriptionKey: "bankDesc", cost: 10000000, income: 70000, baseLimitPerMillion: 0.3, unlock: { building: "powerPlant", amount: 5 } }           // ~10 dla PL, ~3 dla CZ
  ],
  clickUpgrades: [
    { id: "click1", amount: 1, cost: 50 },
    { id: "click2", amount: 2, cost: 300 },
    { id: "click5", amount: 5, cost: 1500 },
    { id: "click10", amount: 10, cost: 10000 },
    { id: "click25", amount: 25, cost: 75000 },
    { id: "click50", amount: 50, cost: 500000 }
  ]
};
