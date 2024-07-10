const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers');
const authMiddleware = require('./middleware/auth');
require('dotenv').config();

const app = express();

connectDB();

app.use(authMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { req };
  },
});

server.applyMiddleware({ app });

module.exports = app;
