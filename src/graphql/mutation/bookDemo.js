import { gql } from "@apollo/client"

const BOOK_DEMO = gql`
  mutation CreateBookDemo($input: CreateBookDemoInput!) {
    createBookDemo(input: $input) {
      id
    }
  }
`
export {
  BOOK_DEMO
}
