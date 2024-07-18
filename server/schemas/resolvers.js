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
      let location;
      
      if (!zip) return list;

      location = {}; try {

        const apiKey ="AIzaSyDAu9aznMdOruW5QNFDfHi6At-jPvJG5S4"

        const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${apiKey}`);
        
        location = geocodeResponse.data.results[0].geometry.location;
        console.log(location)
      } catch(err) {};

      if (!location.lat && !location.lng) return list;

      try {
        const apiKey ="AIzaSyDAu9aznMdOruW5QNFDfHi6At-jPvJG5S4"
        const placesResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=restaurant&key=${apiKey}`);
        
        const results = placesResponse.data.results;

        for (let i = 0; i < results.length; i++)
        {
          let location = results[i];

          list.push({
            restaurantId: location.place_id,
            name: location.name,
            image: location.photos && location.photos[0] ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${location.photos[0].photo_reference}&key=${apiKey}` : null,
            rating: location.rating,
            open: location.opening_hours ? location.opening_hours.open_now: null,
            link: `https://www.google.com/maps/place/?q=place_id:${location.place_id}`,
            address: location.vicinity,
           });
        }
      } catch(err) {
        console.log(err)
      };

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
