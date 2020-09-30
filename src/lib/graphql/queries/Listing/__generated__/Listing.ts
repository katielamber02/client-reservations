/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingType } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Listing
// ====================================================

export interface Listing_listing_host {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
  hasWallet: boolean;
}

export interface Listing_listing_reservations_result_tenant {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
}

export interface Listing_listing_reservations_result {
  __typename: "Reservation";
  id: string;
  tenant: Listing_listing_reservations_result_tenant;
  checkIn: string;
  checkOut: string;
}

export interface Listing_listing_reservations {
  __typename: "Reservations";
  total: number;
  result: Listing_listing_reservations_result[];
}

export interface Listing_listing {
  __typename: "Listing";
  id: string;
  title: string;
  description: string;
  image: string;
  host: Listing_listing_host;
  type: ListingType;
  address: string;
  city: string;
  reservations: Listing_listing_reservations | null;
  reservationsIndex: string;
  price: number;
  guests: number;
}

export interface Listing {
  listing: Listing_listing;
}

export interface ListingVariables {
  id: string;
  reservationsPage: number;
  limit: number;
}
