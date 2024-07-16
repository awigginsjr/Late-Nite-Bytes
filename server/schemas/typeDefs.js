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
  restaurantId: ID, 
  name: String
  } 
  input RestaurantInput {
  restaurantId: ID, 
  name: String
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
  }
`;

module.exports = typeDefs;
