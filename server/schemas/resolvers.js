const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
