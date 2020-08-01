const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

let aboutMessage = "Master Chef API v1.0";

const usersDB = [
  {
    name: "li",
    email: "xxx@gmail.com",
  },
  {
    name: "ti",
    email: "abc@outlook.com",
  }
]

const recipesDB = [
  {
    id: '1',
    title: "Test1",
    author: "li",
    // img: img1,
    created: new Date('2020/07/29').toDateString(),
    ingredients: "a",
    steps: ["111111", "222222"],
    tag: "aaaaaa",
  },
  {
    id: '2',
    title: "Test2",
    author: "ti",
    // img: img2,
    created: new Date('2020/07/30').toDateString(),
    ingredients: "a",
    steps: ["111111", "222222"],
    tag: "aaaaaa",
  }
];

const resolvers = {
  Query: {
    about: () => aboutMessage,
    recipeList: () => recipesDB,
  },
  Mutation: {

  },
  Recipe: {
    author: ({author}) => {
      return usersDB.find((user) => {
        return user.name === author;
      })
    }
  }
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
  console.log('App started on port 3000');
});
