import {gql} from '@apollo/client'

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