import { gql } from "apollo-boost";

export const USER = gql`
  query User(
    $id: ID!
    $reservationsPage: Int!
    $listingsPage: Int!
    $limit: Int!
  ) {
    user(id: $id) {
      id
      name
      avatar
      contact
      hasWallet
      income
      reservations(limit: $limit, page: $reservationsPage) {
        total
        result {
          id
          listing {
            id
            title
            image
            address
            price
            guests
          }
          checkIn
          checkOut
        }
      }
      listings(limit: $limit, page: $listingsPage) {
        total
        result {
          id
          title
          image
          address
          price
          guests
        }
      }
    }
  }
`;
