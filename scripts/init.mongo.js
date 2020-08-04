db.recipes.remove({});
db.users.remove({});

const recipesDB = [
  {
    id: '1',
    title: 'Test1',
    author: 'li',
    img: 'https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg',
    created: new Date('2020/07/29').toDateString(),
    ingredients: ['a'],
    steps: ['111111', '222222'],
    tag: 'aaaaaa',
  },
  {
    id: '2',
    title: 'Test2',
    author: 'ti',
    img: 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2016/11/one-pot-paneer-curry-pie.jpg',
    created: new Date('2020/07/30').toDateString(),
    ingredients: ['a'],
    steps: ['111111', '222222'],
    tag: 'aaaaaa',
  },
];

const usersDB = [
  {
    name: 'li',
    email: 'xxx@gmail.com',
  },
  {
    name: 'ti',
    email: 'abc@outlook.com',
  }
]

db.recipes.insertMany(recipesDB);
db.users.insertMany(usersDB);
const recipeCount = db.recipes.count();
const userCount = db.users.count();
print('Inserted', recipeCount, 'recipes');
print('Inserted', userCount, 'users');

// counters for recipes
db.counters.remove({ _id: 'recipes' });
db.counters.insert({ _id: 'recipes', current: recipeCount });

db.recipes.createIndex({ id: 1 }, { unique: true });
db.recipes.createIndex({ author: 1 });
db.recipes.createIndex({ tag: 1 });
db.recipes.createIndex({ title: 1 });
db.recipes.createIndex({ ingredients: 1 });