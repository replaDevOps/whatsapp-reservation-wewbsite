import { gql } from "@apollo/client"

const LOGIN_SUBSCRIBER = gql`
  mutation LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`
export {
  LOGIN_SUBSCRIBER
}
