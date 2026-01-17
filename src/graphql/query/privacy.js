import { gql } from "@apollo/client";

export const GET_PRIVACY_CONTENT = gql`
    query GetPrivacyPolicy {
        getPrivacyPolicy {
            id
            content
        }
    }
`
