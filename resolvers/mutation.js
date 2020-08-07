const { UserInputError } = require('apollo-server-express');
const { getDB, getNextSequence } = require('../db.js');

function validateInput(recipe) {
  const {
    img,
    description,
    ingredients,
    steps,
    tags,
  } = recipe;
  const newRecipe = Object.assign({}, recipe);
  if (img === '') {
    newRecipe.img = 'https://res.cloudinary.com/masterchef/image/upload/v1596686575/coming-soon_jipkbn.jpg';
  }
  if (description === undefined) newRecipe.description = '';
  if (ingredients === undefined) newRecipe.ingredients = [];
  if (steps === undefined) newRecipe.steps = [];
  if (tags === undefined) newRecipe.tags = [];
  return newRecipe;
}

async function createRecipe(_, { recipe }) {
  const db = getDB();

  const { author } = recipe;
  const userCount = await db.collection('users')
    .countDocuments({ name: { $eq: author } });
  if (userCount === 0) {
    throw new UserInputError('User not found');
  }

  const newRecipe = validateInput(recipe);
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
  const newValue = validateInput(changes);
  await db.collection('recipes').updateOne({ id }, { $set: newValue });
  const savedIssue = await db.collection('recipes').findOne({ id });
  return savedIssue;
}

module.exports = {
  createRecipe,
  createUser,
  deleteRecipe,
  updateRecipe,
};
