import React from "react";
import { server } from "../../lib/api";

const LISTINGS = `
query Listings{
  listings{
    id
    title
    image
    address
    price
   
  }
}
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const getListings = async () => {
    const listings = await server.fetch({ query: LISTINGS });
    console.log(listings);
  };
  return (
    <div>
      <h2>{title} Listings</h2>;<button onClick={getListings}>FETCH</button>
    </div>
  );
};
