const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    areaCode: String
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
  }
`;

module.exports = typeDefs;
