const bcrypt = require('bcrypt');
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

    restaurants: async (parent,{ restaurantData }, context ) => {



      return [
        {
         restaurantId: "aksdlfjasjkfasdjfjasdkl",
         name: "StarBucks",
         image: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
         rating: 5,
         open: true,
         link: "https://www.google.com/maps/place/Starbucks/@35.3285077,-81.0713206,12z/data=!4m10!1m2!2m1!1sstarbucks!3m6!1s0x8856a5d348be5efd:0xd7562e7d82ca6d3f!8m2!3d35.3268674!4d-80.9447512!15sCglzdGFyYnVja3MiA4gBAVoLIglzdGFyYnVja3OSAQtjb2ZmZWVfc2hvcOABAA!16s%2Fg%2F11s0w2jm8_?entry=ttu",
        },
      
        {
          restaurantId: "22aksldfjas32423432",
          name: "Burger King",
          image: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
          rating: 3,
          open: true,
          link: "https://www.google.com/maps/place/Burger+King/@35.3287327,-81.3185937,10z/data=!4m10!1m2!2m1!1sburgerking!3m6!1s0x8856a1020873a27d:0x52e87cbb3149cd73!8m2!3d35.2694222!4d-80.85449!15sCgpidXJnZXJraW5nIgOIAQFaDCIKYnVyZ2Vya2luZ5IBCnJlc3RhdXJhbnTgAQA!16s%2Fg%2F1tf1cg9j?entry=ttu",
         }
      ]
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
