const fs = require('fs');
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { MongoClient } = require('mongodb');

// replace this url
const url = process.env.DB_URL;

let db;

const aboutMessage = 'Master Chef API v1.0';

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
  },
};

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

async function recipeList() {
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
}

async function userList() {
  const users = await db.collection('users').find({}).toArray();
  return users;
}

function author(parent) {
  return db.collection('users').findOne({ name: { $eq: parent.author } });
}

function posts({ name }) {
  return db.collection('recipes')
    .find({ author: { $eq: name } }).toArray();
}

async function createRecipe(_, { recipe }) {
  const userCount = await db.collection('users')
    .countDocuments({ name: { $eq: recipe.author } });
  if (userCount === 0) {
    throw new Error('User not found');
  }
  const newRecipe = Object.assign({}, recipe);
  newRecipe.created = new Date().toDateString();
  newRecipe.id = await getNextSequence('recipes');
  const result = await db.collection('recipes').insertOne(newRecipe);
  const savedRecipe = await db.collection('recipes')
    .findOne({ _id: result.insertedId });
  return savedRecipe;
}

async function createUser(_, { name, email }) {
  const userCount = await db.collection('users')
    .countDocuments({ name: { $eq: name } });
  if (userCount !== 0) {
    throw new Error('username exists');
  }
  const user = {
    name,
    email,
  };
  const result = await db.collection('users').insertOne(user);
  const savedUser = await db.collection('users')
    .findOne({ _id: result.insertedId });
  return savedUser;
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

server.applyMiddleware({ app, path: '/graphql' });

const port = process.env.API_SERVER_PORT || 3000;

(async function start() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`API started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
