import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Layout, List, Typography } from "antd";
import { ListingCard } from "../../lib/components";
import { LISTINGS } from "../../lib/graphql/queries";
import {
  Listings as ListingsData,
  ListingsVariables,
} from "../../lib/graphql/queries/Listings/__generated__/Listings";
import { ListingsFilter } from "../../lib/graphql/globalTypes";
import { RouteComponentProps } from "react-router-dom";

interface MatchParams {
  location: string;
}

const { Content } = Layout;
const { Paragraph, Text, Title } = Typography;

const PAGE_LIMIT = 8;

export const Listings = ({ match }: RouteComponentProps<MatchParams>) => {
  const [filter, setFilter] = useState(ListingsFilter.PRICE_LOW_TO_HIGH);
  const [page, setPage] = useState(1);

  const { loading, data, error } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      variables: {
        location: match.params.location,
        filter,
        limit: PAGE_LIMIT,
        page,
      },
    }
  );
  const listings = data ? data.listings : null;
  const listingsSectionElement =
    listings && listings.result.length ? (
      <div>
        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            lg: 4,
          }}
          dataSource={listings.result}
          renderItem={(listing) => (
            <List.Item>
              <ListingCard listing={listing} />
            </List.Item>
          )}
        />
      </div>
    ) : null;
  console.log("Listings data:", data);
  return (
    <Content className="listings">
      Listings to show:{listingsSectionElement}
    </Content>
  );
};

// import React from "react";
// import { server } from "../../lib/api";
// import { RouteComponentProps } from "react-router-dom";

// const LISTINGS = `
// query Listings{
//   listings{
//     id
//     title
//     image
//     address
//     price

//   }
// }
// `;

// interface Props {
//   title: string;
// }

// export const Listings = ({ title }: Props) => {
//   const getListings = async () => {
//     const listings = await server.fetch({ query: LISTINGS });
//     console.log(listings);
//   };
//   return (
//     <div>
//       <h2>{title} Listings</h2>;<button onClick={getListings}>FETCH</button>
//     </div>
//   );
// };

/* <Route
            path="/listings"
            render={(props) => <Listings {...props} title="Hello" />}
          /> */
