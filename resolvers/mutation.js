require('dotenv').config();
const { UserInputError, AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const { getDB, getNextSequence } = require('../db.js');
// const { getToken } = require('../auth.js');

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

async function createRecipe(_, { recipe }, { user }) {
  const db = getDB();
  if (!user || !user.signedIn) {
    throw new AuthenticationError('you must log in');
  }
  const newRecipe = validateInput(recipe);
  newRecipe.created = new Date().toDateString();
  const id = await getNextSequence('recipes');
  newRecipe.id = id.toString();
  newRecipe.author = user.name;
  const result = await db.collection('recipes').insertOne(newRecipe);
  const savedRecipe = await db.collection('recipes')
    .findOne({ _id: result.insertedId });
  return savedRecipe;
}

async function deleteRecipe(_, { id }, { user }) {
  const db = getDB();
  if (!user || !user.signedIn) {
    throw new AuthenticationError('you must log in');
  }
  const recipe = await db.collection('recipes').findOne({ id });
  if (!recipe) return false;
  if (recipe.author !== user.name) {
    throw new AuthenticationError('you can only delete your own post');
  }
  const result = await db.collection('recipes').deleteOne({ id });
  return result.deletedCount === 1;
}

async function updateRecipe(_, { id, changes }, { user }) {
  const db = getDB();
  if (!user || !user.signedIn) {
    throw new AuthenticationError('you must log in');
  }
  const recipe = await db.collection('recipes').findOne({ id });
  if (!recipe) {
    throw new UserInputError("recipe doesn't exist");
  }
  if (recipe.author !== user.name) {
    throw new AuthenticationError('you can only edit your own post');
  }
  if (Object.keys(changes).length === 0) {
    throw new UserInputError('must specify a field');
  }
  const newValue = validateInput(changes);
  await db.collection('recipes').updateOne({ id }, { $set: newValue });
  const savedRecipe = await db.collection('recipes').findOne({ id });
  return savedRecipe;
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
    avatar: Math.random() < 0.5
      ? 'https://res.cloudinary.com/masterchef/image/upload/v1597214676/avatar1_gyl0bj.png'
      : 'https://res.cloudinary.com/masterchef/image/upload/v1597214676/avatar2_zn99ij.png',
  };
  const result = await db.collection('users').insertOne(userData);
  const savedUser = await db.collection('users')
    .findOne({ _id: result.insertedId });
  return savedUser;
}

async function updateAvatar(_, { img }, { user }) {
  const db = getDB();
  if (!user || !user.signedIn) {
    throw new AuthenticationError('you must log in');
  }
  const { name } = user;
  const result = await db.collection('users')
    .updateOne({ name }, { $set: { avatar: img } });
  return result.modifiedCount === 1;
}

module.exports = {
  createRecipe,
  deleteRecipe,
  updateRecipe,
  createUser,
  updateAvatar,
};
