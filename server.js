const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

let aboutMessage = "Master Chef API v1.0";

const usersDB = [
  {
    name: "li",
    email: "xxx@gmail.com",
  },
  {
    name: "ti",
    email: "abc@outlook.com",
  }
]

const recipesDB = [
  {
    id: '1',
    title: "Test1",
    author: "li",
    // img: img1,
    created: new Date('2020/07/29').toDateString(),
    ingredients: "a",
    steps: ["111111", "222222"],
    tag: "aaaaaa",
  },
  {
    id: '2',
    title: "Test2",
    author: "ti",
    // img: img2,
    created: new Date('2020/07/30').toDateString(),
    ingredients: "a",
    steps: ["111111", "222222"],
    tag: "aaaaaa",
  }
];

const resolvers = {
  Query: {
    about: () => aboutMessage,
    recipeList: () => recipesDB, // get all recipes
    userList: ()=> usersDB
  },
  Mutation: {
    createRecipe,
    createUser,
  },
  Recipe: {
    // match a recipe with its author
    author: ({author}) => {
      return usersDB.find((user) => {
        return user.name === author;
      })
    }
  },
  User: {
    // match a user with all his posts
    posts: ({name}) => {
      return recipesDB.filter((recipe) => {
        return recipe.author === name;
      })
    }
  }
};

function createRecipe(_, {recipe}) {
  const userExist = usersDB.some((user) => user.name === recipe.author);
  if (!userExist) {
    throw new Error('User not found');
  }
  recipe.created = new Date().toDateString();
  recipe.id = recipesDB.length + 1;
  recipesDB.push(recipe);
  return recipe;
}

function createUser(_, {name, email}) {
  const nameToken = usersDB.some((user) => user.name === name);
  if (nameToken) {
    throw new Error('username exists');
  }
  const user = {
    name: name,
    email: email,
    posts: []
  }
  usersDB.push(user);
  return user;
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
  console.log('App started on port 3000');
});
