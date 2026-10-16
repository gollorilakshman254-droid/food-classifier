/**
 * Food knowledge base.
 *
 * MobileNet is trained on ImageNet, which contains a limited set of food classes.
 * Each entry below maps one or more ImageNet class names (the `keys`) to a friendly
 * name, a category and a rough nutrition estimate for one typical serving.
 *
 * Nutrition values are approximations for illustration, not dietary advice.
 */
export const FOODS = [
  // Ready meals and fast food
  { keys: ['pizza'], name: 'Pizza', category: 'Fast food', serving: '1 slice (about 107 g)', kcal: 285, protein: 12, carbs: 36, fat: 10 },
  { keys: ['cheeseburger'], name: 'Cheeseburger', category: 'Fast food', serving: '1 burger (about 120 g)', kcal: 303, protein: 15, carbs: 30, fat: 14 },
  { keys: ['hotdog', 'hot dog'], name: 'Hot dog', category: 'Fast food', serving: '1 hot dog with bun', kcal: 290, protein: 10, carbs: 24, fat: 17 },
  { keys: ['burrito'], name: 'Burrito', category: 'Main dish', serving: '1 burrito (about 250 g)', kcal: 450, protein: 20, carbs: 55, fat: 17 },
  { keys: ['carbonara'], name: 'Spaghetti carbonara', category: 'Main dish', serving: '1 plate (about 300 g)', kcal: 560, protein: 22, carbs: 60, fat: 25 },
  { keys: ['meat loaf', 'meatloaf'], name: 'Meatloaf', category: 'Main dish', serving: '1 slice (about 120 g)', kcal: 250, protein: 18, carbs: 10, fat: 15 },
  { keys: ['potpie'], name: 'Pot pie', category: 'Main dish', serving: '1 slice (about 200 g)', kcal: 400, protein: 12, carbs: 38, fat: 22 },
  { keys: ['hot pot', 'hotpot'], name: 'Hot pot', category: 'Main dish', serving: '1 bowl (about 400 g)', kcal: 350, protein: 25, carbs: 20, fat: 18 },
  { keys: ['consomme'], name: 'Consommé', category: 'Soup', serving: '1 cup (about 240 ml)', kcal: 15, protein: 3, carbs: 1, fat: 0 },
  { keys: ['guacamole'], name: 'Guacamole', category: 'Dip', serving: '1/4 cup (about 60 g)', kcal: 90, protein: 1, carbs: 5, fat: 8 },

  // Bakery
  { keys: ['french loaf'], name: 'French bread', category: 'Bakery', serving: '2 slices (about 60 g)', kcal: 160, protein: 6, carbs: 30, fat: 1 },
  { keys: ['bagel', 'beigel'], name: 'Bagel', category: 'Bakery', serving: '1 medium bagel (about 105 g)', kcal: 275, protein: 11, carbs: 54, fat: 2 },
  { keys: ['pretzel'], name: 'Pretzel', category: 'Bakery', serving: '1 soft pretzel (about 65 g)', kcal: 200, protein: 5, carbs: 42, fat: 2 },
  { keys: ['dough'], name: 'Dough', category: 'Bakery', serving: '100 g', kcal: 270, protein: 8, carbs: 50, fat: 3 },

  // Desserts and drinks
  { keys: ['ice cream', 'icecream'], name: 'Ice cream', category: 'Dessert', serving: '1/2 cup (about 66 g)', kcal: 140, protein: 2, carbs: 16, fat: 7 },
  { keys: ['ice lolly', 'popsicle'], name: 'Ice lolly', category: 'Dessert', serving: '1 pop (about 60 g)', kcal: 45, protein: 0, carbs: 11, fat: 0 },
  { keys: ['trifle'], name: 'Trifle', category: 'Dessert', serving: '1 serving (about 150 g)', kcal: 260, protein: 4, carbs: 32, fat: 13 },
  { keys: ['chocolate sauce', 'chocolate syrup'], name: 'Chocolate sauce', category: 'Dessert', serving: '2 tbsp (about 40 g)', kcal: 110, protein: 1, carbs: 25, fat: 1 },
  { keys: ['espresso'], name: 'Espresso', category: 'Drink', serving: '1 shot (about 30 ml)', kcal: 3, protein: 0, carbs: 0, fat: 0 },

  // Fruit
  { keys: ['strawberry'], name: 'Strawberries', category: 'Fruit', serving: '1 cup (about 150 g)', kcal: 49, protein: 1, carbs: 12, fat: 0.5 },
  { keys: ['orange'], name: 'Orange', category: 'Fruit', serving: '1 medium orange', kcal: 62, protein: 1, carbs: 15, fat: 0 },
  { keys: ['lemon'], name: 'Lemon', category: 'Fruit', serving: '1 medium lemon', kcal: 29, protein: 1, carbs: 9, fat: 0 },
  { keys: ['fig'], name: 'Fig', category: 'Fruit', serving: '1 medium fig (about 50 g)', kcal: 37, protein: 0.4, carbs: 10, fat: 0.2 },
  { keys: ['pineapple', 'ananas'], name: 'Pineapple', category: 'Fruit', serving: '1 cup chunks (about 165 g)', kcal: 82, protein: 1, carbs: 22, fat: 0.2 },
  { keys: ['banana'], name: 'Banana', category: 'Fruit', serving: '1 medium banana', kcal: 105, protein: 1, carbs: 27, fat: 0.4 },
  { keys: ['jackfruit'], name: 'Jackfruit', category: 'Fruit', serving: '1 cup (about 165 g)', kcal: 157, protein: 3, carbs: 38, fat: 1 },
  { keys: ['custard apple'], name: 'Custard apple', category: 'Fruit', serving: '100 g', kcal: 101, protein: 1.7, carbs: 25, fat: 0.6 },
  { keys: ['pomegranate'], name: 'Pomegranate', category: 'Fruit', serving: '1/2 cup seeds (about 87 g)', kcal: 72, protein: 1.5, carbs: 16, fat: 1 },
  { keys: ['granny smith'], name: 'Apple', category: 'Fruit', serving: '1 medium apple', kcal: 95, protein: 0.5, carbs: 25, fat: 0.3 },

  // Vegetables
  { keys: ['head cabbage'], name: 'Cabbage', category: 'Vegetable', serving: '1 cup shredded (about 89 g)', kcal: 22, protein: 1, carbs: 5, fat: 0.1 },
  { keys: ['broccoli'], name: 'Broccoli', category: 'Vegetable', serving: '1 cup (about 91 g)', kcal: 31, protein: 2.5, carbs: 6, fat: 0.3 },
  { keys: ['cauliflower'], name: 'Cauliflower', category: 'Vegetable', serving: '1 cup (about 107 g)', kcal: 27, protein: 2, carbs: 5, fat: 0.3 },
  { keys: ['zucchini', 'courgette'], name: 'Zucchini', category: 'Vegetable', serving: '1 medium (about 196 g)', kcal: 33, protein: 2.4, carbs: 6, fat: 0.6 },
  { keys: ['spaghetti squash'], name: 'Spaghetti squash', category: 'Vegetable', serving: '1 cup cooked (about 155 g)', kcal: 42, protein: 1, carbs: 10, fat: 0.4 },
  { keys: ['acorn squash'], name: 'Acorn squash', category: 'Vegetable', serving: '1 cup cooked (about 205 g)', kcal: 115, protein: 2, carbs: 30, fat: 0.3 },
  { keys: ['butternut squash'], name: 'Butternut squash', category: 'Vegetable', serving: '1 cup cooked (about 205 g)', kcal: 82, protein: 2, carbs: 22, fat: 0.2 },
  { keys: ['cucumber', 'cuke'], name: 'Cucumber', category: 'Vegetable', serving: '1 cup sliced (about 104 g)', kcal: 16, protein: 0.7, carbs: 4, fat: 0.2 },
  { keys: ['artichoke'], name: 'Artichoke', category: 'Vegetable', serving: '1 medium, cooked', kcal: 64, protein: 3.5, carbs: 14, fat: 0.4 },
  { keys: ['bell pepper'], name: 'Bell pepper', category: 'Vegetable', serving: '1 medium pepper', kcal: 31, protein: 1, carbs: 7, fat: 0.4 },
  { keys: ['mushroom'], name: 'Mushrooms', category: 'Vegetable', serving: '1 cup sliced (about 70 g)', kcal: 15, protein: 2, carbs: 2, fat: 0.2 },
  { keys: ['corn'], name: 'Corn', category: 'Vegetable', serving: '1 ear (about 90 g of kernels)', kcal: 88, protein: 3, carbs: 19, fat: 1.4 },
];

export const FOOD_COUNT = FOODS.length;
export const FOOD_CATEGORIES = [...new Set(FOODS.map((f) => f.category))];

// Pre-compiled word-boundary matchers so "corn" does not match "acorn".
const MATCHERS = FOODS.map((food) => ({
  food,
  patterns: food.keys.map((k) => new RegExp(`\\b${k}\\b`, 'i')),
}));

export function matchFood(className) {
  for (const { food, patterns } of MATCHERS) {
    if (patterns.some((p) => p.test(className))) return food;
  }
  return null;
}

/** "cheeseburger, hamburger" -> "Cheeseburger" */
export function prettyName(className) {
  const first = className.split(',')[0].trim();
  return first.charAt(0).toUpperCase() + first.slice(1);
}

/**
 * Turns raw MobileNet predictions into something the UI can show.
 * verdict: 'food' | 'maybe' | 'not-food'
 */
export function analyseResults(predictions) {
  const items = predictions.map((p) => ({
    className: p.className,
    label: prettyName(p.className),
    probability: p.probability,
    food: matchFood(p.className),
  }));

  const foodScore = items.reduce((sum, item) => (item.food ? sum + item.probability : sum), 0);
  const top = items[0];
  const bestFood = items.find((item) => item.food) || null;

  let verdict = 'not-food';
  if (bestFood && foodScore >= 0.4) verdict = 'food';
  else if (bestFood && foodScore >= 0.15) verdict = 'maybe';

  const subject = verdict === 'not-food' ? top : bestFood;

  return {
    items,
    foodScore,
    verdict,
    top,
    bestFood,
    headline: verdict === 'not-food' ? top.label : bestFood.food.name,
    probability: subject.probability,
  };
}
