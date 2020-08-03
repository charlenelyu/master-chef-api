const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { MongoClient } = require('mongodb');

// replace this url
const url = 'mongodb+srv://<username>:<password>@cluster0.w1lxr.mongodb.net/masterchef?retryWrites=true';

let db;

let aboutMessage = "Master Chef API v1.0";

const resolvers = {
  Query: {
    about: () => aboutMessage,
    recipeList,
    userList,
  },
  Mutation: {
    createRecipe,
    createUser,
  },
  Recipe: {
    author, // match a recipe with its author
  },
  User: {
    posts, // match a user with all his posts
  }
};

async function recipeList() {
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
}

async function userList() {
  const users = await db.collection('users').find({}).toArray();
  return users;
}

async function author({author}) {
  const list = await userList();
  return list.find((user) => {
    return user.name === author;
  })
}

async function posts({name}) {
  const list = await recipeList();
  return list.filter((recipe) => {
    return recipe.author === name;
  })
}

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
  }
  usersDB.push(user);
  return user;
}

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  } 
})();