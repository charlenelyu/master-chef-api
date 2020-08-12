const { getDB } = require('../db.js');

// lock down type fields
function email(parent, _, { user }) {
  if (user.signedIn && user.name === parent.name) {
    return parent.email;
  }
  return null;
}

function password(parent, _, { user }) {
  if (user.signedIn && user.name === parent.name) {
    return parent.password;
  }
  return null;
}

// match user with posts
function posts({ name }) {
  const db = getDB();
  return db.collection('recipes')
    .find({ author: { $eq: name } }).toArray();
}

module.exports = { email, password, posts };
