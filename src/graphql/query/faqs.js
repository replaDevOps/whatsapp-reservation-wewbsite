import { gql } from "@apollo/client";


const GET_FAQS = gql`
    query GetFaqs($limit: Int!, $offset: Int!) {
        getFaqs(limit: $limit, offset: $offset) {
            totalCount
            faqs {
                id
                question
                answer
                createdAt
            }
        }
    }
`

export {GET_FAQS}