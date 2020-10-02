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
import { RouteComponentProps, Link } from "react-router-dom";

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
  const listingsRegion = listings ? listings.region : null;
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
    ) : (
      <div>
        <Paragraph>
          It appears that no listings have yet been created for{" "}
          <Text mark>"{listingsRegion}"</Text>
        </Paragraph>
        <Paragraph>
          Be the first person to create a{" "}
          <Link to="/host">listing in this area</Link>!
        </Paragraph>
      </div>
    );
  console.log("Listings data:", data);

  const listingsRegionElement = listingsRegion ? (
    <Title level={3} className="listings__title">
      Results for "{listingsRegion}"
    </Title>
  ) : null;
  return (
    <Content className="listings">
      {listingsRegionElement}
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
