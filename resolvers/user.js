const { getDB } = require('../db.js');

// match user with posts
function posts({ name }) {
  const db = getDB();
  return db.collection('recipes')
    .find({ author: { $eq: name } }).toArray();
}

module.exports = { posts };
