import { gql } from "@apollo/client";

const REGISTER_SUBSCRIBER = gql`
    mutation RegisterUser($input: CreateUserInput!) {
        registerUser(input: $input) {
            id
            email
        }
    }
`
export {
    REGISTER_SUBSCRIBER
}
