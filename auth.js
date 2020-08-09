const jwt = require('jsonwebtoken');

let { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  JWT_SECRET = 'tempjwtsecretfordevonly';
  console.log('Missing env var JWT_SECRET. Using unsafe dev secret');
}

function getToken(user) {
  const { name, email } = user;
  const credentials = { signedIn: true, name, email };
  const token = jwt.sign(credentials, JWT_SECRET);
  return token;
}

module.exports = { getToken };
