import { gql } from '@apollo/client';

export const AUTH_USER = gql`
  query {
    me {
      _id
      username
      email
      areaCode
      favoriteRestaurants {
        restaurantId
        name
      }
    }
  }
`;
