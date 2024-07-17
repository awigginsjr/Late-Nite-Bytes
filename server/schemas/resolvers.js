const bcrypt = require('bcrypt');
const axios = require('axios');
// const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => await User.find(),
  },
  Mutation: {
    register: async (_, args) => {
      const user = await User.create(args);
      //add token
  const token = signToken(user)
  

      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);

      return { token, user };
    },

    restaurants: async (parent, {areaCode}, context ) =>
    {
      let list = [];

      if (!context.user) return list;

      const user = await User.findById(context.user._id);

      let zip = areaCode || (user ? user.areaCode : null);

      if (!zip) return list;

      let location = {}; try {

        const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${process.env.VITE_GOOGLE_API_KEY}`);
        
        location = geocodeResponse.data.results[0].geometry.location;

      } catch(err) {};

      if (!location.lat && !location.lng) return list;

      try {

        const placesResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=restaurant&key=${process.env.VITE_GOOGLE_API_KEY}`);
        const results = placesResponse.data.results;

        for (let i = 0; i < results.length; i++)
        {
          let location = results[i];

          console.log(location);

          list.push({
            restaurantId: location.place_id,
            name: location.name,
            image: location.photos[0],
            rating: location.rating,
            open: location.opening_hours,
            link: location.vicinity,
           });
        }
      } catch(err) {};

      return list;
    },



    favRestaurant: async (parent,{ restaurantData }, context ) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate (
          {
            _id: context.user._id
          },
          {$push: {
            favoriteRestaurants: restaurantData
          }},
          { new: true }
        )
        return updatedUser 
      }
      throw AuthenticationError;
    }
  },
};

module.exports = resolvers;
