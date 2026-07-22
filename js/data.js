window.ET_DATA = {
  version: "0.3.0-part-2",
  activeCountry: "poland",
  countries: {
    poland: {
      id: "poland",
      name: "Polska",
      nameKey: "poland",
      flag: "🇵🇱",
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
      population: "10.9M",
      gdp: "€0.3T",
      unlocked: false,
      licenseCost: 10000000,
      nextLicense: "germany",
      bonus: { building: "factory", multiplier: 1.15, text: "+15% 🏭" }
    },
    germany: { id: "germany", name: "Niemcy", flag: "🇩🇪", unlocked: false, licenseCost: 100000000, nextLicense: "france" },
    france: { id: "france", name: "Francja", flag: "🇫🇷", unlocked: false, licenseCost: 1000000000, nextLicense: null },
    norway: { id: "norway", name: "Norwegia", flag: "🇳🇴", unlocked: false, licenseCost: 500000000, nextLicense: null },
    italy: { id: "italy", name: "Włochy", flag: "🇮🇹", unlocked: false, licenseCost: 750000000, nextLicense: null },
    spain: { id: "spain", name: "Hiszpania", flag: "🇪🇸", unlocked: false, licenseCost: 800000000, nextLicense: null }
  },
  buildings: [
    { id: "smallBusiness", icon: "🏪", nameKey: "smallBusiness", descriptionKey: "smallBusinessDesc", cost: 25, income: 1, limit: 3800 },
    { id: "farm", icon: "🌾", nameKey: "farm", descriptionKey: "farmDesc", cost: 250, income: 8, limit: 1900, unlock: { building: "smallBusiness", amount: 5 } },
    { id: "factory", icon: "🏭", nameKey: "factory", descriptionKey: "factoryDesc", cost: 3000, income: 55, limit: 900, unlock: { building: "farm", amount: 20 } },
    { id: "mine", icon: "⛏️", nameKey: "mine", descriptionKey: "mineDesc", cost: 25000, income: 340, limit: 400, unlock: { building: "factory", amount: 10 } },
    { id: "hotel", icon: "🏨", nameKey: "hotel", descriptionKey: "hotelDesc", cost: 175000, income: 2100, limit: 200, unlock: { building: "mine", amount: 10 } },
    { id: "powerPlant", icon: "⚡", nameKey: "powerPlant", descriptionKey: "powerPlantDesc", cost: 1000000, income: 12000, limit: 100, unlock: { building: "hotel", amount: 5 } },
    { id: "bank", icon: "🏦", nameKey: "bank", descriptionKey: "bankDesc", cost: 10000000, income: 70000, limit: 10, unlock: { building: "powerPlant", amount: 5 } }
  ],
  clickUpgrades: [
    { id: "click1", amount: 1, cost: 50 },
    { id: "click2", amount: 5, cost: 300 },
    { id: "click5", amount: 10, cost: 1500 },
    { id: "click10", amount: 50, cost: 10000 },
    { id: "click25", amount: 100, cost: 75000 },
    { id: "click50", amount: 500, cost: 500000 }
  ]
};
