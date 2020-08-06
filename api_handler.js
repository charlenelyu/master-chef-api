const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');

const {
  getAboutMessage,
  recipeList,
  userList,
  recipeInfo,
} = require('./resolvers/query.js');
const {
  createRecipe,
  createUser,
  deleteRecipe,
  updateRecipe,
} = require('./resolvers/mutation.js');
const { author } = require('./resolvers/recipe.js');
const { posts } = require('./resolvers/user.js');

const resolvers = {
  Query: {
    about: getAboutMessage,
    recipeList,
    userList,
    recipeInfo,
  },
  Mutation: {
    createRecipe,
    createUser,
    deleteRecipe,
    updateRecipe,
  },
  Recipe: {
    author, // match recipe with user
  },
  User: {
    posts, // match user with posts
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  server.applyMiddleware({ app, path: '/graphql' });
}

module.exports = { installHandler };
