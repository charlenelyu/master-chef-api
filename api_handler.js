const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');

const {
  getAboutMessage,
  recipeList,
  // userList,
  recipeInfo,
} = require('./resolvers/query.js');
const {
  createRecipe,
  deleteRecipe,
  updateRecipe,
  createUser,
  // login,
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
  },
  Mutation: {
    createRecipe,
    deleteRecipe,
    updateRecipe,
    createUser,
    // login,
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
  server.applyMiddleware({ app, path: '/graphql' });
}

module.exports = { installHandler };
