const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const {
  getAboutMessage,
  recipeList,
  // userList,
  recipeInfo,
  // mypost,
  me,
} = require('./resolvers/query.js');
const {
  createRecipe,
  deleteRecipe,
  updateRecipe,
  createUser,
} = require('./resolvers/mutation.js');
const { author } = require('./resolvers/recipe.js');
const { posts } = require('./resolvers/user.js');
const auth = require('./auth.js');

const resolvers = {
  Query: {
    about: getAboutMessage,
    recipeList,
    // userList,
    recipeInfo,
    // mypost,
    me,
  },
  Mutation: {
    createRecipe,
    deleteRecipe,
    updateRecipe,
    createUser,
  },
  Recipe: {
    author, // match recipe with user
  },
  User: {
    posts, // match user with posts
  },
};

function getContext({ req }) {
  const user = auth.getUser(req);
  return { user };
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  context: getContext,
  formatError: (error) => {
    console.log(error);
    return error;
  },
  playground: true,
  introspection: true,
});

function installHandler(app) {
  const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:8000';
  const methods = 'POST';
  const cors = { origin, methods, credentials: true };
  server.applyMiddleware({ app, path: '/graphql', cors });
}

module.exports = { installHandler };
