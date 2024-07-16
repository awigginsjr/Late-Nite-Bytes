import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
  mutation register($username: String, $email: String, $password: String, $areaCode: String,) {
    register(username: $username, email: $email, password: $password, areaCode: $areaCode,) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const FAV_RESTAURANT = gql`
mutation favRestaurant ($restaurantData: RestaurantInput){
favRestaurant (restaurantData: $restaurantData){
favoriteRestaurants{
      restaurantId
      name
     }
  }
}
`