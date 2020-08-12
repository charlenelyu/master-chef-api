const { AuthenticationError } = require('apollo-server-express');

const { getDB } = require('../db.js');

const aboutMessage = 'Master Chef API v1.0';

function getAboutMessage() {
  return aboutMessage;
}

async function recipeList() {
  const db = getDB();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
}

// async function userList() {
//   const db = getDB();
//   const users = await db.collection('users').find({}).toArray();
//   return users;
// }

async function recipeInfo(_, { id }) {
  const db = getDB();
  const recipeOne = await db.collection('recipes').findOne({ id });
  return recipeOne;
}

// async function mypost(_, args, { user }) {
//   const db = getDB();
//   if (!user || !user.signedIn) {
//     throw new AuthenticationError('you must log in');
//   }
//   const recipes = await db.collection('recipes')
//     .find({ author: { $eq: user.name } }).toArray();
//   return recipes;
// }

async function me(_, args, { user }) {
  const db = getDB();
  if (!user || !user.signedIn) {
    throw new AuthenticationError('you must log in');
  }
  const userOne = await db.collection('users')
    .findOne({ name: { $eq: user.name } });
  return userOne;
}

module.exports = {
  getAboutMessage,
  recipeList,
  // userList,
  recipeInfo,
  // mypost,
  me,
};
