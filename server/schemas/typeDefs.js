const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    areaCode: String
    favoriteRestaurants: [Restaurant]
  }
  type Restaurant {
    _id: ID
    restaurantId: String
    name: String
    image: String
    rating: String
    open: String
    link: String
  } 
  input RestaurantInput {
  restaurantId: ID, 
  name: String,
  image: String
    rating: String
    open: String
    link: String
  } 
  type AuthPayload {
    token: String
    user: User
  }
  type Query {
    users: [User]
    me: User
  }
  type Mutation {
    register(username: String, email: String, password: String, areaCode: String): AuthPayload
    login(email: String, password: String): AuthPayload
    favRestaurant (restaurantData: RestaurantInput): User
    restaurants(areaCode: String): [Restaurant]
  }
`;

module.exports = typeDefs;
