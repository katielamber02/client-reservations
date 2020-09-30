/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user_reservations_result_listing {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  guests: number;
}

export interface User_user_reservations_result {
  __typename: "Reservation";
  id: string;
  listing: User_user_reservations_result_listing;
  checkIn: string;
  checkOut: string;
}

export interface User_user_reservations {
  __typename: "Reservations";
  total: number;
  result: User_user_reservations_result[];
}

export interface User_user_listings_result {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  guests: number;
}

export interface User_user_listings {
  __typename: "Listings";
  total: number;
  result: User_user_listings_result[];
}

export interface User_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
  contact: string;
  hasWallet: boolean;
  income: number | null;
  reservations: User_user_reservations | null;
  listings: User_user_listings;
}

export interface User {
  user: User_user;
}

export interface UserVariables {
  id: string;
  reservationsPage: number;
  listingsPage: number;
  limit: number;
}
