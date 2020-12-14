const config = {
  volMillis: process.env.volMillis || 1.6, // Milliliter pr. millisecond

  // ingredient binding
  ingredient1: process.env.ingredient1 || undefined, // Ingredient on pump 1
  ingredient2: process.env.ingredient2 || undefined, // Ingredient on pump 2
  ingredient3: process.env.ingredient3 || undefined, // Ingredient on pump 3
  ingredient4: process.env.ingredient4 || undefined, // Ingredient on pump 4
  ingredient5: process.env.ingredient5 || undefined, // Ingredient on pump 5
  ingredient6: process.env.ingredient6 || undefined, // Ingredient on pump 6
  ingredient7: process.env.ingredient7 || undefined, // Ingredient on pump 7
  ingredient8: process.env.ingredient8 || undefined, // Ingredient on pump 8
  ingredient9: process.env.ingredient9 || undefined, // Ingredient on pump 9
  ingredient10: process.env.ingredient10 || undefined, // Ingredient on pump 10
  ingredient11: process.env.ingredient11 || undefined, // Ingredient on pump 11
  ingredient12: process.env.ingredient12 || undefined, // Ingredient on pump 12
  ingredient13: process.env.ingredient13 || undefined, // Ingredient on pump 13
  ingredient14: process.env.ingredient14 || undefined, // Ingredient on pump 14
  ingredient15: process.env.ingredient15 || undefined, // Ingredient on pump 15
  ingredient16: process.env.ingredient16 || undefined, // Ingredient on pump 16

  // listen PORT
  port: 80,

  // GPIO ports
  relay1: process.env.relay1 || '21',
  relay2: process.env.relay2 || '20',
  relay3: process.env.relay3 || '26',
  relay4: process.env.relay4 || '16',
  relay5: process.env.relay5 || '19',
  relay6: process.env.relay6 || '13',
  relay7: process.env.relay7 || '12',
  relay8: process.env.relay8 || '6',
  relay9: process.env.relay9 || '5',
  relay10: process.env.relay10 || '25',
  relay11: process.env.relay11 || '24',
  relay12: process.env.relay12 || '23',
  relay13: process.env.relay13 || '22',
  relay14: process.env.relay14 || '27',
  relay15: process.env.relay15 || '18',
  relay16: process.env.relay16 || '17'
};

module.exports = config;
