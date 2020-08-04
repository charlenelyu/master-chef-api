const { getDB } = require('../db.js');

// match recipe with user
function author(parent) {
  const db = getDB();
  return db.collection('users').findOne({ name: { $eq: parent.author } });
}

module.exports = { author };
