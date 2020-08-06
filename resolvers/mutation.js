const { UserInputError } = require('apollo-server-express');
const { getDB, getNextSequence } = require('../db.js');

async function createRecipe(_, { recipe }) {
  const db = getDB();
  const userCount = await db.collection('users')
    .countDocuments({ name: { $eq: recipe.author } });
  if (userCount === 0) {
    throw new UserInputError('User not found');
  }
  const newRecipe = Object.assign({}, recipe);
  newRecipe.created = new Date().toDateString();
  newRecipe.id = await getNextSequence('recipes');
  if (recipe.img === '') {
    newRecipe.img = 'https://res.cloudinary.com/masterchef/image/upload/v1596686575/coming-soon_jipkbn.jpg';
  }
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
    throw new UserInputError('username exists');
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

async function deleteRecipe(_, { id }) {
  const db = getDB();
  const recipe = await db.collection('recipes').findOne({ id });
  if (!recipe) return false;
  const result = await db.collection('recipes').deleteOne({ id });
  return result.deletedCount === 1;
}

async function updateRecipe(_, { id, changes }) {
  const db = getDB();
  const recipe = await db.collection('recipes').findOne({ id });
  if (!recipe) {
    throw new UserInputError("recipe doesn't exist");
  }
  if (Object.keys(changes).length === 0) {
    throw new UserInputError('must specify a field');
  }
  await db.collection('recipes').updateOne({ id }, { $set: changes });
  const savedIssue = await db.collection('recipes').findOne({ id });
  return savedIssue;
}

module.exports = {
  createRecipe,
  createUser,
  deleteRecipe,
  updateRecipe,
};
