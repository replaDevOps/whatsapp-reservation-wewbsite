import { gql } from "@apollo/client";

const REGISTER_SUBSCRIBER = gql`
    mutation RegisterUser($input: CreateUserInput!) {
        registerUser(input: $input) {
            id
            email
        }
    }
`
const CREATE_BUSINESS = gql `
    mutation CreateBusiness($input: CreateBusinessInput!) {
        createBusiness(input: $input) {
            id
        }
    }
`
export {
    REGISTER_SUBSCRIBER,
    CREATE_BUSINESS
}
