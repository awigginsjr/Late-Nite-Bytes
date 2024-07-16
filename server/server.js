require('dotenv').config({path: '../.env'});

const express = require('express');
const path = require('path');
const axios = require('axios');
// Import the ApolloServer class
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');


// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/db.js');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }


  // http://localhost:3001/api/restaurants?location=xyz&radius=abc&type=wahtever&key=asdfsafdsafsaf
  app.get('/api/restaurants', async (req, res) => {

    //console.log(req.session);
    //const { location, radius, type } = req.query;

    let location = req.query.zipcode;
    let radius = 5;
    let type = 'gas';
    const apiKey = process.env.VITE_GOOGLE_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`;

    console.log(apiKey);
    console.log(url);

    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error fetching data from Google Places API');
    }
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
