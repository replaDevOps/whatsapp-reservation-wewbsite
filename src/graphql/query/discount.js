import { gql } from "@apollo/client";

const GET_DISCOUNTS = gql`
    query GetDiscounts($offset: Int!, $limit: Int!, $filter: DiscountFilter) {
        getDiscounts(offset: $offset, limit: $limit, filter: $filter) {
            totalCount
            discounts {
                id
                code
                group
                discountType
                value
                packageType
                usageLimit
                remainingLimit
                startDate
                expiryDate
                status
                createdAt
            }
        }
    }
`;

const VERIFY_PROMOTION_CODE = gql`
    query VerifyPromotion($name: String!) {
        verifyPromotion(name: $name) {
            id
            status
        }
    }
`

export {GET_DISCOUNTS,VERIFY_PROMOTION_CODE}