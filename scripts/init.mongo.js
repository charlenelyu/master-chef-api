/* global db print */
/* eslint no-restricted-globals: "off" */

const recipeData = [
  {
    id: '1',
    author: 'li',
    title: 'mini buffalo chicken cheesesteaks',
    img: 'https://res.cloudinary.com/masterchef/image/upload/v1596699562/mini-buffalo_xmr726.jpg',
    created: new Date('2018/12/4').toDateString(),
    description: 'these party-style chicken cheesesteaks are flavored with buffalo sauce and blue cheese and garnished with fresh herbs. a heavy drizzle of cheez whiz really takes it to a new level.',
    ingredients: ['olive oil', 'green bell pepper', 'yellow onion', 'salt', 'pepper', 'chicken', 'heavy cream', 'buffalo', 'blue cheese', 'cheez whiz', 'rolls', 'green onion', 'parsley'],
    steps: ['heat 1 tablespoon of olive oil in a skillet over medium heat', 'add bell pepper and saut until softened slightly , about 3 minutes', 'add onion and season with salt and pepper', 'saut until softened , about 7 minutes', 'stir in the chicken', 'add heavy cream , buffalo sauce and blue cheese', 'stir and cook until heated through , about 3-5 minutes', 'season with salt and pepper', 'turn heat to low and keep warm', 'microwave the cheez whiz in a heat safe bowl for about 90 seconds , stirring every 30 seconds', 'wrap the rolls in damp paper towels and microwave for 90 seconds', 'fill each roll with buffalo chicken mixture , drizzle with warm cheeze whiz , and garnish with green onions , parsley and blue cheese crumbles'],
    tags: ['lunch', 'poultry', 'meat', 'sandwiches'],
  },
  {
    id: '2',
    author: 'lyu',
    title: 'baked shrimp and orzo with chickpeas lemon and dill',
    img: 'https://res.cloudinary.com/masterchef/image/upload/v1596702795/baked-shrimp_nscl9q.jpg',
    created: new Date('2019/10/2').toDateString(),
    description: 'shrimp and orzo make for a simple and flavorful dinner duo.',
    ingredients: ['jumbo shrimp', 'salt & freshly ground black pepper', 'olive oil', 'fennel bulb', 'garlic cloves', 'crushed red pepper flakes', 'orzo pasta', 'chickpeas', 'cherry tomatoes', 'kalamata olive', 'dill', 'lemon, zest of', 'dry white wine', 'low sodium chicken broth', 'feta'],
    steps: ['preheat oven to 450 degrees', 'dry shrimp with paper towels and season with salt and pepper', 'add 1 tablespoon olive oil to a large , ovenproof skillet over high heat', 'swirl to coat', 'when shimmering , add shrimp in an even layer', 'cook , turning once , until lightly seared , about 1 minutes per side', 'add additional 1 tablespoon olive oil halfway through cooking if skillet is dry', 'remove shrimp to a plate', 'reduce heat to medium-high and add 2 tablespoons olive oil', 'add fennel , garlic , chile flakes', 'season with salt and pepper and cook until softened and golden in spots , about 4 minutes', 'add orzo , chickpeas , cherry tomatoes , olives , dill , and lemon zest', 'stir to combine', 'add white wine and let reduce for 30 seconds', 'add chicken broth , stir to combine , and return shrimp to skillet , nestling them into as even a layer as possible', 'bring to a boil and transfer to oven', 'bake 4 minutes , stir gently , and continue baking until orzo is cooked through , about 4 minutes more', 'serve immediately , drizzled with olive oil and topped with additional dill , lemon wedges , and feta'],
    tags: ['seafood'],
  },
  {
    id: '3',
    author: 'li',
    title: 'chicken meatball tikka masala',
    img: 'https://res.cloudinary.com/masterchef/image/upload/v1596703121/masala_xa5ggn.jpg',
    created: new Date('2018/9/17').toDateString(),
    description: 'this can easily be an appetizer or main dish served with basmati rice and garlic naan.',
    ingredients: ['ground chicken', 'egg', 'plain breadcrumbs', 'tomato paste', 'salt', 'black pepper', 'garam masala', 'fresh cilantro', 'ghee', 'yellow onion', 'garlic cloves', 'chilies', 'ginger', 'ground turmeric', 'curry powder', 'ground cardamom', 'ground coriander', 'ground cumin', 'fresh coarse ground black pepper', 'crushed red pepper flakes', 'crushed tomatoes', 'heavy cream', 'cilantro leaf', 'basmati rice', 'naan bread'],
    steps: ['in a large bowl , combine the chicken , egg , bread crumbs , tomato paste , salt , pepper , garam masala , and 3 tablespoons chopped cilantro until well incorporated', 'shape into meatballs about the size of a golf ball', 'set a large skillet with high sides over medium-high heat with the ghee', 'once hot , sear the meatballs in batches , for about 8 minutes , turning over halfway', 'transfer to a plate and continue browning the rest of the meatballs', "you don't need them to be fully cooked , just brown in color", "they'll continue to cook later on", 'add the remaining tablespoon ghee or oil to the same skillet over medium-high heat', 'once hot , add in the onion , garlic , and peppers and cook until softened , about 3 to 5 minutes', 'stir in the ginger , spices , and tomato paste', 'stir and cook for about 1 to 2 minutes , or until the tomato paste has darkened', 'stir in the canned tomatoes', 'bring to a simmer and stir in heavy cream and 3 / 4 cup cilantro', 'place the meatballs into the sauce , lower the flame and simmer until the sauce has reduced slightly and thickened and the meatballs have fully cooked through , about 30 to 40 minutes', 'garnish with fresh cilantro leaves', 'serve the masala with cooked basmati rice and naan'],
    tags: ['indian', 'poultry', 'meat'],
  },
  {
    id: '4',
    author: 'lyu',
    title: 'coco oatmeal honey cookies',
    img: 'https://res.cloudinary.com/masterchef/image/upload/v1596706099/coco-cookie_k0rhbr.jpg',
    created: new Date('2019/8/6').toDateString(),
    description: 'the fiber-rich cookies are good for snacking.honey is a good option for sweetness as natural honey helps improving immunity. it is a healthy choice for those who love chocolate flavor and also for kids.',
    ingredients: ['oats', 'whole wheat flour', 'cocoa powder', 'milk', 'honey', 'butter'],
    steps: ['preheat oven to 180 degrees celsius', 'mix cocoa powder , butter , sugar , and milk in a pan', 'bring it to a boil , stirring continuously', 'remove it from flame', 'add oats , flour , and honey', 'mix well', 'with the help of a spoon pour one spoonful of the mixture on a waxed paper or greased cookie sheet', 'bake for 10-12 minutes till cooked', 'take out of oven , let it cool for few minutes on the tray before transferring it to a wire rack', 'let them cool on the wire rack before serving', 'store in an air-tight container'],
    tags: ['breakfast', 'dessert', 'sweets'],
  },
  {
    id: '5',
    author: 'li',
    title: 'bacon and egg breakfast stromboli',
    img: 'https://res.cloudinary.com/masterchef/image/upload/v1596708537/bacon-and-egg_nk0dzf.jpg',
    created: new Date('2018/7/30').toDateString(),
    description: 'delicious bacon, cheddar cheese and scrambled eggs are rolled up in puff pastry for a breakfast-spin on an italian classic.',
    ingredients: ['bacon', 'puff pastry', 'eggs', 'sharp cheddar cheese', 'egg', 'water', 'salt and pepper'],
    steps: ['place oven rack in center of oven and preheat to 400f', 'cook bacon', 'remove to paper-towel lined plate', 'lightly flour work surface and unfold puff pastry sheet , rolling it out to a 14 x 14 square', 'pinch seams created by folds to seal them together as you roll', 'move dough often and dust sticky areas with flour', 'arrange 4 bacon slices in 2 lines from left to right: one across the top , the other across the bottom , leaving 1 border', 'between rows of bacon spread scrambled eggs running entire width of bacon lines , but not all the way to edge of dough', 'scatter cheese over top', 'beat remaining egg with water and brush around perimeter of dough', 'begin rolling stromboli by taking the longer side of dough and rolling it over filling', 'pinch seam to seal', 'place stromboli on parchment lined baking sheet with seam side down', 'tuck ends under to seal and brush entire roll with egg wash', 'sprinkle dough with salt and pepper to taste', 'bake for 2530 minutes , or until crust is deep golden brown', 'let sit for at least 5 minutes before slicing', 'serve hot'],
    tags: ['breakfast', 'italian'],
  },
  {
    id: '6',
    author: 'lyu',
    title: 'bacon wrapped coconut quiche and coconut popcorn shrimp',
    img: 'https://res.cloudinary.com/masterchef/image/upload/v1596708548/bacon-coconut_myurbj.jpg',
    created: new Date('2019/7/30').toDateString(),
    description: 'i made coconut flavored quiche adding fresh corn to enhance more sweet flavor and wrapped with bacon so that it has sweet salty taste which enhances your appetite. to make it tastier and more fun to eat, i made popcorn shrimp adding more coconut and top with spicy cocktail sauce.',
    ingredients: ['coconut milk', 'eggs', 'fresh corn kernels', 'parmesan cheese', 'bacon', 'large shrimp', 'all-purpose flour', 'egg', 'yellow cornmeal', 'panko breadcrumbs', 'coconut oil', 'unsweetened flaked coconut', 'tomato ketchup', 'worcestershire sauce', 'lemon juice', 'soy sauce', 'tabasco sauce'],
    steps: ['preheat oven to 350 degrees f', 'grease bottom of a muffin baking pan with 6 cups with non-stick cooking spray', 'put flour into a shallow plate', 'beat 1 egg into a bowl', 'put panko and cornmeal into another shallow plate and mix to combine', 'pat shrimp dry with paper towels and season with salt and black pepper', 'make filling', 'in a blender , put coconut milk and corn', 'puree until almost smooth', 'transfer the mixture into another bowl', 'add 2 eggs and parmesan cheese to the bowl and whisk to combine', 'season with salt and black pepper', 'cook bacon in a non-stick skillet over medium heat until lightly browned flipping once', 'drain on paper towels', 'place each bacon along sides of each muffin cup', 'pour the filling into each cup evenly', 'bake in the oven for 23-25 minutes or until center of the quiche is almost set', 'in the meantime , make coconut popcorn shrimp', 'peel , divined and remove tail from each shrimp and pat dry with paper towels', 'dredge shrimp in flour , dip in the egg and coat with cornmeal mixture', 'in a deep skillet , heat coconut oil to medium high', 'work in batches', 'deep fry shrimp until cooked through and golden brown', 'drain on paper towels lined plate', 'when the quiche is baked , remove the pan from the oven and put popcorn shrimp on each quiche , return the pan into the oven and bake in the oven for another 2 minutes', 'let rest on a rack for 5 minutes', 'in the meantime , make cocktail sauce', 'in a small bowl , mix together ketchup , worcestershire sauce , lemon juice , soy sauce and tabasco', 'to serve , remove each quiche from the pan and place on each serving plate', 'drizzle the cocktail sauce over the popcorn shrimp', 'sprinkle with coconut flakes over the top'],
    tags: ['lunch'],
  },
  {
    id: '7',
    author: 'li',
    title: 'cauliflower ceviche',
    img: 'https://res.cloudinary.com/masterchef/image/upload/v1596708563/cauliflower-ceviche_v0ivgi.jpg',
    created: new Date('2018/7/30').toDateString(),
    description: "a healthy ceviche - a perfect appetizer for parties and gatherings. and guests won't even know it's vegan!",
    ingredients: ['cauliflower', 'red onion', 'cilantro', 'cumin', 'salt', 'jalapeno', 'limes', 'tortilla chips'],
    steps: ['place cauliflower in a pot with one inch of salted water , and allow to steam , approximately 5 minute cauliflower is ready when it gently slides off a fork when stabbed', 'allow cauliflower to cool', 'while cauliflower is cooling , add chopped onion to a bowl of salted water', 'allow to soak 5 minutes , then drain', 'give cauliflower a rough chop to create small pieces , about the size of a dime', "it's okay if there are different sized pieces", 'place in a large mixing bowl', 'squeeze juice of 6 limes over mixture and mix well', 'add chopped cilantro , drained onions , chopped jalapeo , salt , pepper , and cumin to bowl', 'blend well', 'allow mixture to cool in the refrigerator and allow the flavors to mingle if desired', 'otherwise , ready to eat immediately !', 'ceviche can be served alongside corn tortilla chips or on a tostada', 'optional serving suggestion: add guacamole to the tostada or add chipotle mayo to the tostada before adding the ceviche for a kick', 'optional serving suggestion: add guacamole to the tostada or add chipotle mayo to the tostada before adding the ceviche for a kick'],
    tags: ['vegetables', 'mexican'],
  },
  {
    id: '8',
    author: 'lyu',
    title: 'coconut shrimp pizza',
    img: 'https://res.cloudinary.com/masterchef/image/upload/v1596708609/coconut-shrimp-pizza_zurprv.jpg',
    created: new Date('2019/7/25').toDateString(),
    description: 'bring the island vibes to pizza night with this epic mashup.',
    ingredients: ['pizza dough', 'butter', 'garlic cloves', 'panko breadcrumbs', 'sweetened flaked coconut', 'eggs', 'small shrimp', 'canola oil', 'mozzarella cheese', 'red fresno chile', 'pineapple', 'red onion', 'scallions', 'kosher salt', 'ground black pepper'],
    steps: ['heat oven to 425 degrees f', 'line a baking sheet with parchment paper', 'unroll pizza dough and place on prepared baking sheet , stretching to make into a rectangle', 'in a small saucepan , melt butter over medium heat with garlic', 'brush melted garlic butter on dough and bake for 8 minutes', 'set aside', 'in a shallow dish , stir to combine panko , shredded coconut , 1 / 2 teaspoon salt and 1 / 8 teaspoon pepper', 'place eggs in a separate shallow bowl or dish and beat with a whisk', 'coat shrimp in egg then coat in panko and coconut', 'place on a plate or tray', 'heat canola oil in a medium skillet over medium heat', 'cook shrimp until lightly golden , about 1-2 minutes per side', 'drain cooked shrimp on a towel-lined plate', 'to prepare pizza , top crust with half of the shredded mozzarella , chilis , pineapple , red onion and coconut shrimp', 'sprinkle over remaining cheese and bake until crust is golden and cheese is melted , about 6-10 minutes', 'transfer to a cutting board and garnish with chopped scallions'],
    tags: ['seafood', 'pizza'],
  },
  {
    id: '9',
    author: 'li',
    title: 'shrimp scampi garlic bread',
    img: 'https://res.cloudinary.com/masterchef/image/upload/v1596708619/Shrimp-Scampi-Garlic-Bread-Pizza_woddcn.jpg',
    created: new Date('2019/7/25').toDateString(),
    description: 'turn your favorite side into a full meal with the addition of garlicky shrimp.',
    ingredients: ['baguette', 'unsalted butter', 'garlic', 'parmesan cheese', 'red chili pepper flakes', 'dry white wine', 'small shrimp', 'cream cheese', 'parsley'],
    steps: ['preheat oven to broil', 'hollow out the inside of the baguette using a serrated knife to cut a wedge out from the top , and scoop out some of the bread', 'place baguette on a baking sheet', 'in a small saucepan , melt 4 tablespoons butter and 1 tablespoon chopped garlic over medium heat', 'use a brush to coat the top and inside of the bread with the butter and garlic mixture', 'sprinkle 3 tablespoons grated parmesan cheese over bread and broil until toasted , about 3-5 minutes', 'set aside', 'in a large skillet , melt remaining 6 tablespoons butter over medium heat', 'stir in remaining garlic and cook until fragrant , about 1-2 minutes', 'add a pinch of chili flakes and white wine and bring to a boil', 'stir in shrimp and cream cheese and cook until cream cheese is melted and shrimp is cooked through , about 2 minutes', 'season to taste with salt and pepper and pour into the bread', 'garnish with chopped parsley and a sprinkle of parmesan cheese'],
    tags: ['grains', 'seafood'],
  },
  {
    id: '10',
    author: 'lyu',
    title: 'spicy beef flatbread with yogurt cucumbers',
    img: 'https://res.cloudinary.com/masterchef/image/upload/v1596708629/spicy-beef_hxo1d3.jpg',
    created: new Date('2019/7/24').toDateString(),
    description: "this dish can work as a side or a main. it's especially great for impromptu guests.",
    ingredients: ['yogurt', 'fresh lemon juice', 'kosher salt', 'garlic cloves', 'tomato paste', 'ground cinnamon', 'ground cumin', 'paprika', 'ground beef', 'extra virgin olive oil', 'red onion', 'all-purpose flour', 'pizza dough', 'cornmeal', 'persian cucumbers', 'cilantro leaf', 'vegetable oil'],
    steps: ['prepare a grill for medium-high heat', 'thoroughly clean grates and brush with oil', 'whisk yogurt and lemon juice in a medium bowl', 'season with salt and pepper', 'set aside until ready to assemble', 'mix garlic , tomato paste , cinnamon , cumin , paprika , and 2 1 / 2 teaspoons salt in a large bowl', 'mix in beef and 2 tablespoons olive oil until completely combined', 'heat remaining 2 tablespoons oil in a large cast iron skillet on the grill or stove over medium high', 'cook beef mixture , stirring occasionally and breaking up large clumps , until browned and cooked through , 12-14 minutes', 'add onion and cook until just beginning to soften , about 2 minutes', 'remove from heat and set aside until ready to assemble', 'increase grill to high heat', 'on a clean work surface lightly dusted with flour , stretch or roll each piece of dough into a 12- x 10-inch oval and transfer to a pizza peel or cookie sheet dusted with cornmeal', 'transfer both pieces of prepared dough to grill over direct heat', 'cook until first side is charred and dough is dry and stiff , about 2 minutes', 'turn and cook just until second side is charred and cooked through , about 2 minutes', 'transfer to baking sheet and let cool slightly', 'top with cooked beef mixture , dividing evenly', 'dollop with yogurt mixture and top with cucumber and cilantro'],
    tags: ['meat', 'pizza'],
  },
  {
    id: '11',
    author: 'li',
    title: 'hawaiian poke bowl',
    img: 'https://res.cloudinary.com/masterchef/image/upload/v1596708636/akis-poke-bowl_zayyzc.jpg',
    created: new Date('2019/7/11').toDateString(),
    description: "every since i've traveled to hawaii and tasted the poke bowl, i'm hooked! it's easy to make at home and perfect for a hot summer weeknight meal!",
    ingredients: ['short-grain rice', 'salmon', 'salt', 'green onion', 'toasted sesame seeds', 'light soy sauce', 'toasted sesame oil', 'rice vinegar', 'chili sauce', 'avocado', 'greens', 'pickled daikon'],
    steps: ['in a medium , whisk together the hawaiian salt , green onion , onion , sesame seeds , soy sauce , sesame oil , vinegar , and sriracha', 'then , gently toss the salmon in the sauce to coat , set aside', 'cut half of the avocado into thin slices', 'gently fan out the avocado slices into a long strip', 'start from one side and gently roll it up to create the flower shape', 'repeat with the remaining half of the avocado', 'to assemble:', 'place the avocado flower on top of the rice on one side of the bowl', 'then , spoon the poke salmon on the other side', 'garnish the top of the poke with micro greens', 'lastly , place a few pickled daikon between the poke and the avocado flower', 'repeat with the remaining ingredients to make another serving', 'enjoy !'],
    tags: ['lunch', 'asian'],
  },
  {
    id: '12',
    author: 'lyu',
    title: 'everything bagel tortellini',
    img: 'https://res.cloudinary.com/masterchef/image/upload/v1596708646/everything-bagel-tortellini_hln0kh.jpg',
    created: '2018/6/18',
    description: "breakfast meets lunch in your mouth when you pair an everything bagel's delightful flavors with a bite-sized mouth-watering tortellini.",
    ingredients: ['pasta', 'panko breadcrumbs', 'butter', 'cream cheese', 'egg', 'parmesan cheese', 'bacon', 'eggs', 'egg yolk', 'seasoning'],
    steps: ['to make the filling:', 'put cream cheese in a bowl and add toasted panko breadcrumbs , 3 / 4 of the everything bagel seasoning blend , egg , cheese , and season with salt and pepper', 'stir well and place in a piping bag', 'refrigerate', 'to prepare pasta & sauce:', 'roll out the dough into a sheets', 'you want to have paper thin sheets so you can use a pasta roller', 'cut the sheets into rounds using 3 cookie cutter', 'pipe a teaspoon of filling into the middle of each pasta round', 'dip your finger into a bowl of water and run it along the edge of the round to moisten', 'fold the dough over to form a half moon and seal the edges', 'then draw the two corners together to form a rounded bonnet shape', 'press tightly to seal', 'toss with flour and cover', 'repeat', 'cook the bacon until crisp', 'remove excess fat', 'boil the tortellini until tender in a pot of salted water', 'strain and move to bacon pan', 'toss', 'immediately move everything to a bowl with the egg mixture , toss well to coat', 'serve and top with everything bagel seasoning spice'],
    tags: ['brunch'],
  },
];

const userData = [
  {
    name: 'li',
    email: 'li@gmail.com',
    password: '$2a$10$ShlY3ovxAnCHiyU03vz7tur9sUn93Xs9Tfewpy3NRWDY6u6XwH9.i',
    avatar: 'https://res.cloudinary.com/masterchef/image/upload/v1597214676/avatar1_gyl0bj.png',
  },
  {
    name: 'lyu',
    email: 'lyu@outlook.com',
    password: '$2a$10$661r/7muYQMZaphDsVqsauPZe69CVvL0Cz6efnp8DoEwf0Fj1w.ea',
    avatar: 'https://res.cloudinary.com/masterchef/image/upload/v1597214676/avatar2_zn99ij.png',
  },
];

db.recipes.remove({});
db.users.remove({});

db.recipes.insertMany(recipeData);
db.users.insertMany(userData);
const recipeCount = db.recipes.count();
const userCount = db.users.count();
print('Inserted', recipeCount, 'recipes');
print('Inserted', userCount, 'users');

// counters for recipes
db.counters.remove({ _id: 'recipes' });
db.counters.insert({ _id: 'recipes', current: recipeCount });

db.recipes.createIndex({ id: 1 }, { unique: true });
// db.recipes.createIndex({ author: 1 });
// db.recipes.createIndex({ tag: 1 });
db.recipes.createIndex({ title: 1 });
// db.recipes.createIndex({ ingredients: 1 });

db.recipes.createIndex({ title: 'text' });
