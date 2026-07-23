window.ET_DATA = {
  version: "0.3.0-part-2",
  activeCountry: "poland",
  countries: {
    poland: {
      id: "poland", name: "Polska", nameKey: "poland", flag: "🇵🇱",
      populationNum: 37.5, population: "37.5M", gdp: "€0.9T",
      unlocked: true, licenseCost: 0, nextLicense: "czechia",
      bonus: { building: "farm", multiplier: 1.10, text: "+10% 🌾" }
    },
    czechia: {
      id: "czechia", name: "Czechy", nameKey: "czechia", flag: "🇨🇿",
      populationNum: 10.9, population: "10.9M", gdp: "€0.3T",
      unlocked: false, licenseCost: 5000000,
      nextLicense: "germany",
      bonus: { building: "factory", multiplier: 1.15, text: "+15% 🏭" }
    },
    germany: {
      id: "germany", name: "Niemcy", nameKey: "germany", flag: "🇩🇪",
      populationNum: 84.4, population: "84.4M", gdp: "€4.1T",
      unlocked: false, licenseCost: 50000000,
      nextLicense: "france",
      bonus: { building: "powerPlant", multiplier: 1.20, text: "+20% ⚡" }
    },
    france: {
      id: "france", name: "Francja", nameKey: "france", flag: "🇫🇷",
      populationNum: 68.1, population: "68.1M", gdp: "€2.8T",
      unlocked: false, licenseCost: 250000000,
      nextLicense: "italy",
      bonus: { building: "hotel", multiplier: 1.25, text: "+25% 🏨" }
    },
    italy: {
      id: "italy", name: "Włochy", nameKey: "italy", flag: "🇮🇹",
      populationNum: 58.9, population: "58.9M", gdp: "€2.1T",
      unlocked: false, licenseCost: 750000000,
      nextLicense: "spain",
      bonus: { building: "smallBusiness", multiplier: 1.25, text: "+25% 🏪" }
    },
    spain: {
      id: "spain", name: "Hiszpania", nameKey: "spain", flag: "🇪🇸",
      populationNum: 48.1, population: "48.1M", gdp: "€1.4T",
      unlocked: false, licenseCost: 1500000000,
      nextLicense: "norway",
      bonus: { building: "mine", multiplier: 1.30, text: "+30% ⛏️" }
    },
    norway: {
      id: "norway", name: "Norwegia", nameKey: "norway", flag: "🇳🇴",
      populationNum: 5.5, population: "5.5M", gdp: "€0.5T",
      unlocked: false, licenseCost: 5000000000,
      nextLicense: "netherlands",
      bonus: { building: "bank", multiplier: 1.50, text: "+50% 🏦" }
    },
    netherlands: {
      id: "netherlands", name: "Holandia", nameKey: "netherlands", flag: "🇳🇱",
      populationNum: 17.8, population: "17.8M", gdp: "€1.0T",
      unlocked: false, licenseCost: 1250000000,
      nextLicense: "uk",
      bonus: { building: "smallBusiness", multiplier: 1.35, text: "+35% 🏪" }
    },
    uk: {
      id: "uk", name: "Wielka Brytania", nameKey: "uk", flag: "🇬🇧",
      populationNum: 67.3, population: "67.3M", gdp: "€3.1T",
      unlocked: false, licenseCost: 3000000000,
      nextLicense: "austria",
      bonus: { building: "bank", multiplier: 1.60, text: "+60% 🏦" }
    },
    austria: {
      id: "austria", name: "Austria", nameKey: "austria", flag: "🇦🇹",
      populationNum: 9.1, population: "9.1M", gdp: "€0.47T",
      unlocked: false, licenseCost: 7500000000,
      nextLicense: "switzerland",
      bonus: { building: "hotel", multiplier: 1.40, text: "+40% 🏨" }
    },
    switzerland: {
      id: "switzerland", name: "Szwajcaria", nameKey: "switzerland", flag: "🇨🇭",
      populationNum: 8.8, population: "8.8M", gdp: "€0.8T",
      unlocked: false, licenseCost: 20000000000,
      nextLicense: "sweden",
      bonus: { building: "bank", multiplier: 2.00, text: "+100% 🏦" }
    },
    sweden: {
      id: "sweden", name: "Szwecja", nameKey: "sweden", flag: "🇸🇪",
      populationNum: 10.5, population: "10.5M", gdp: "€0.58T",
      unlocked: false, licenseCost: 50000000000,
      nextLicense: "ukraine",
      bonus: { building: "factory", multiplier: 1.50, text: "+50% 🏭" }
    },
    ukraine: {
      id: "ukraine", name: "Ukraina", nameKey: "ukraine", flag: "🇺🇦",
      populationNum: 38.0, population: "38.0M", gdp: "€0.18T",
      unlocked: false, licenseCost: 125000000000,
      nextLicense: "portugal",
      bonus: { building: "farm", multiplier: 2.00, text: "+100% 🌾" }
    },
    portugal: {
      id: "portugal", name: "Portugalia", nameKey: "portugal", flag: "🇵🇹",
      populationNum: 10.4, population: "10.4M", gdp: "€0.25T",
      unlocked: false, licenseCost: 300000000000,
      nextLicense: "greece",
      bonus: { building: "hotel", multiplier: 1.60, text: "+60% 🏨" }
    },
    greece: {
      id: "greece", name: "Grecja", nameKey: "greece", flag: "🇬🇷",
      populationNum: 10.4, population: "10.4M", gdp: "€0.22T",
      unlocked: false, licenseCost: 750000000000,
      nextLicense: "finland",
      bonus: { building: "smallBusiness", multiplier: 1.75, text: "+75% 🏪" }
    },
    finland: {
      id: "finland", name: "Finlandia", nameKey: "finland", flag: "🇫🇮",
      populationNum: 5.6, population: "5.6M", gdp: "€0.28T",
      unlocked: false, licenseCost: 20000000000,
      nextLicense: "denmark",
      bonus: { building: "powerPlant", multiplier: 1.80, text: "+80% ⚡" }
    },
    denmark: {
      id: "denmark", name: "Dania", nameKey: "denmark", flag: "🇩🇰",
      populationNum: 5.9, population: "5.9M", gdp: "€0.4T",
      unlocked: false, licenseCost: 50000000000,
      nextLicense: null,
      bonus: { building: "mine", multiplier: 2.50, text: "+150% ⛏️" }
    }
  },
  buildings: [
    { id: "smallBusiness", icon: "🏪", nameKey: "smallBusiness", descriptionKey: "smallBusinessDesc", cost: 25000, income: 250, baseLimitPerMillion: 101.33 },
    { id: "farm", icon: "🌾", nameKey: "farm", descriptionKey: "farmDesc", cost: 100000, income: 1000, baseLimitPerMillion: 50.66, unlock: { building: "smallBusiness", amount: 5 } },
    { id: "factory", icon: "🏭", nameKey: "factory", descriptionKey: "factoryDesc", cost: 800000, income: 8000, baseLimitPerMillion: 24, unlock: { building: "farm", amount: 20 } },
    { id: "mine", icon: "⛏️", nameKey: "mine", descriptionKey: "mineDesc", cost: 2500000, income: 25000, baseLimitPerMillion: 10.66, unlock: { building: "factory", amount: 10 } },
    { id: "hotel", icon: "🏨", nameKey: "hotel", descriptionKey: "hotelDesc", cost: 7000000, income: 70000, baseLimitPerMillion: 5.33, unlock: { building: "mine", amount: 10 } },
    { id: "powerPlant", icon: "⚡", nameKey: "powerPlant", descriptionKey: "powerPlantDesc", cost: 120000000, income: 1200000, baseLimitPerMillion: 2.66, unlock: { building: "hotel", amount: 5 } },
    { id: "bank", icon: "🏦", nameKey: "bank", descriptionKey: "bankDesc", cost: 1000000000, income: 10000000, baseLimitPerMillion: 0.27, unlock: { building: "powerPlant", amount: 5 } }
  ],
  clickUpgrades: [
    { id: "click1", amount: 1, cost: 50 },
    { id: "click5", amount: 5, cost: 300 },
    { id: "click10", amount: 10, cost: 1000 },
    { id: "click25", amount: 25, cost: 5000 },
    { id: "click50", amount: 50, cost: 25000 },
    { id: "click200", amount: 200, cost: 50000 }
  ]
};
