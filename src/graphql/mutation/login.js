import { gql } from "@apollo/client"

const LOGIN_SUBSCRIBER = gql`
  mutation LoginUser($email: String, $password: String,  $role: UserRole!) {
    loginUser(email: $email, password: $password, role: $role) {
      token
      user {
        id
        firstName
        lastName
      }
    }
  }
`
export {
  LOGIN_SUBSCRIBER
}
