import { gql } from "apollo-boost";

export const LISTING = gql`
  query Listing($id: ID!, $reservationsPage: Int!, $limit: Int!) {
    listing(id: $id) {
      id
      title
      description
      image
      host {
        id
        name
        avatar
        hasWallet
      }
      type
      address
      city
      reservations(limit: $limit, page: $reservationsPage) {
        total
        result {
          id
          tenant {
            id
            name
            avatar
          }
          checkIn
          checkOut
        }
      }
      reservationsIndex
      price
      guests
    }
  }
`;
