require('dotenv').config();
const Router = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const { getDB } = require('./db.js');

let { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  JWT_SECRET = 'tempjwtsecretfordevonly';
  console.log('Missing env var JWT_SECRET. Using unsafe dev secret');
}

const routes = new Router();

routes.use(bodyParser.json());

const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:8000';
routes.use(cors({ origin, credentials: true }));

function getUser(req) {
  const token = req.cookies.jwt;
  if (!token) return { signedIn: false };
  try {
    const credentials = jwt.verify(token, JWT_SECRET);
    return credentials;
  } catch (error) {
    return { signedIn: false };
  }
}

routes.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const db = getDB();
  const user = await db.collection('users').findOne({ email });
  if (!user) {
    res.json({ signedIn: false, message: 'email does not exist' });
    return;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.json({ signedIn: false, message: 'invalid password' });
    return;
  }
  const credentials = {
    signedIn: true, name: user.name, email: user.email,
  };
  const token = jwt.sign(credentials, JWT_SECRET, { expiresIn: '7d' });
  res.cookie('jwt', token, { httpOnly: true });
  res.json(credentials);
});

routes.post('/logout', async (req, res) => {
  res.clearCookie('jwt');
  res.json({ status: 'ok' });
});

routes.post('/user', (req, res) => {
  res.json(getUser(req));
});

module.exports = { routes, getUser };

// function getToken(user) {
//   const { name, email } = user;
//   const credentials = { signedIn: true, name, email };
//   const token = jwt.sign(credentials, JWT_SECRET);
//   return token;
// }

// module.exports = { getToken };
