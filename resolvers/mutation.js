require('dotenv').config();
const { UserInputError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const { getDB, getNextSequence } = require('../db.js');
const { getToken } = require('../auth.js');

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

async function createUser(_, { user }) {
  const db = getDB();
  const nameCount = await db.collection('users')
    .countDocuments({ name: { $eq: user.name } });
  if (nameCount !== 0) {
    throw new UserInputError('username has been taken');
  }
  const emailCount = await db.collection('users')
    .countDocuments({ email: { $eq: user.email } });
  if (emailCount !== 0) {
    throw new UserInputError('email exists');
  }
  const hashed = await bcrypt.hash(user.password, 10);
  const userData = {
    ...user,
    password: hashed,
  };
  const result = await db.collection('users').insertOne(userData);
  const savedUser = await db.collection('users')
    .findOne({ _id: result.insertedId });
  const token = getToken(savedUser);
  return { user: savedUser, token };
}

async function login(_, { email, password }) {
  const db = getDB();
  const user = await db.collection('users').findOne({ email });
  if (!user) {
    throw new UserInputError('email does not exist');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UserInputError('password invalid');
  }
  const token = getToken(user);
  return { user, token };
}

module.exports = {
  createRecipe,
  deleteRecipe,
  updateRecipe,
  createUser,
  login,
};
