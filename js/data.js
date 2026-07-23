window.ET_DATA = {
  version: "0.3.0-part-2",
  activeCountry: "poland",
  countries: {
    poland: {
      id: "poland",
      name: "Polska",
      nameKey: "poland",
      flag: "🇵🇱",
      populationNum: 37.5,
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
      populationNum: 10.9,
      population: "10.9M",
      gdp: "€0.3T",
      unlocked: false,
      licenseCost: 10000000, // 10 mln zł
      nextLicense: "germany",
      bonus: { building: "factory", multiplier: 1.15, text: "+15% 🏭" }
    },
    germany: {
      id: "germany",
      name: "Niemcy",
      nameKey: "germany",
      flag: "🇩🇪",
      populationNum: 84.4,
      population: "84.4M",
      gdp: "€4.1T",
      unlocked: false,
      licenseCost: 100000000, // 100 mln zł
      nextLicense: "france",
      bonus: { building: "powerPlant", multiplier: 1.20, text: "+20% ⚡" }
    },
    france: {
      id: "france",
      name: "Francja",
      nameKey: "france",
      flag: "🇫🇷",
      populationNum: 68.1,
      population: "68.1M",
      gdp: "€2.8T",
      unlocked: false,
      licenseCost: 500000000, // 500 mln zł
      nextLicense: "italy",
      bonus: { building: "hotel", multiplier: 1.25, text: "+25% 🏨" }
    },
    italy: {
      id: "italy",
      name: "Włochy",
      nameKey: "italy",
      flag: "🇮🇹",
      populationNum: 58.9,
      population: "58.9M",
      gdp: "€2.1T",
      unlocked: false,
      licenseCost: 1500000000, // 1.5 mld zł
      nextLicense: "spain",
      bonus: { building: "smallBusiness", multiplier: 1.25, text: "+25% 🏪" }
    },
    spain: {
      id: "spain",
      name: "Hiszpania",
      nameKey: "spain",
      flag: "🇪🇸",
      populationNum: 48.1,
      population: "48.1M",
      gdp: "€1.4T",
      unlocked: false,
      licenseCost: 3000000000, // 3 mld zł
      nextLicense: "norway",
      bonus: { building: "mine", multiplier: 1.30, text: "+30% ⛏️" }
    },
    norway: {
      id: "norway",
      name: "Norwegia",
      nameKey: "norway",
      flag: "🇳🇴",
      populationNum: 5.5,
      population: "5.5M",
      gdp: "€0.5T",
      unlocked: false,
      licenseCost: 10000000000, // 10 mld zł
      nextLicense: null,
      bonus: { building: "bank", multiplier: 1.50, text: "+50% 🏦" }
    }
  },
  buildings: [
    { id: "smallBusiness", icon: "🏪", nameKey: "smallBusiness", descriptionKey: "smallBusinessDesc", cost: 25000, income: 250, baseLimitPerMillion: 101.33 },
    { id: "farm", icon: "🌾", nameKey: "farm", descriptionKey: "farmDesc", cost: 100000, income: 1000, baseLimitPerMillion: 50.66, unlock: { building: "smallBusiness", amount: 5 } },
    { id: "factory", icon: "🏭", nameKey: "factory", descriptionKey: "factoryDesc", cost: 1000000, income: 10000, baseLimitPerMillion: 24, unlock: { building: "farm", amount: 20 } },
    { id: "mine", icon: "⛏️", nameKey: "mine", descriptionKey: "mineDesc", cost: 2500000, income: 25000, baseLimitPerMillion: 10.66, unlock: { building: "factory", amount: 10 } },
    { id: "hotel", icon: "🏨", nameKey: "hotel", descriptionKey: "hotelDesc", cost: 7000000, income: 70000, baseLimitPerMillion: 5.33, unlock: { building: "mine", amount: 10 } },
    { id: "powerPlant", icon: "⚡", nameKey: "powerPlant", descriptionKey: "powerPlantDesc", cost: 120000000, income: 1200000, baseLimitPerMillion: 2.66, unlock: { building: "hotel", amount: 5 } },
    { id: "bank", icon: "🏦", nameKey: "bank", descriptionKey: "bankDesc", cost: 1000000000, income: 10000000, baseLimitPerMillion: 0.30, unlock: { building: "powerPlant", amount: 5 } }
  ],
  clickUpgrades: [
    { id: "click1", amount: 1, cost: 50 },
    { id: "click2", amount: 5, cost: 300 },
    { id: "click5", amount: 10, cost: 1000 },
    { id: "click10", amount: 25, cost: 5000 },
    { id: "click25", amount: 50, cost: 20000 },
    { id: "click50", amount: 200, cost: 50000 }
  ]
};
