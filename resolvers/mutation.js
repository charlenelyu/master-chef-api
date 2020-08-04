const { getDB, getNextSequence } = require('../db.js');

async function createRecipe(_, { recipe }) {
  const db = getDB();
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
  const db = getDB();
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

module.exports = { createRecipe, createUser };
