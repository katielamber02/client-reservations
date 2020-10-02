import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Layout, List, Typography, Affix } from "antd";
import { ListingCard, ErrorBanner } from "../../lib/components";
import { LISTINGS } from "../../lib/graphql/queries";
import {
  Listings as ListingsData,
  ListingsVariables,
} from "../../lib/graphql/queries/Listings/__generated__/Listings";
import { ListingsFilter } from "../../lib/graphql/globalTypes";
import { RouteComponentProps, Link } from "react-router-dom";
import {
  ListingsFilters,
  ListingsPagination,
  ListingsSkeleton,
} from "./components";

interface MatchParams {
  location: string;
}

const { Content } = Layout;
const { Paragraph, Text, Title } = Typography;

const PAGE_LIMIT = 2;

export const Listings = ({ match }: RouteComponentProps<MatchParams>) => {
  const locationRef = useRef(match.params.location);
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
  useEffect(() => {
    setPage(1);
    locationRef.current = match.params.location;
  }, [match.params.location]);
  if (loading) {
    return (
      <Content className="listings">
        <ListingsSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="listings">
        <ErrorBanner description="We either couldn't find anything matching your search or have encountered an error. If you're searching for a unique location, try searching again with more common keywords." />
        <ListingsSkeleton />
      </Content>
    );
  }
  const listings = data ? data.listings : null;
  const listingsRegion = listings ? listings.region : null;
  const listingsSectionElement =
    listings && listings.result.length ? (
      <div>
        <Affix offsetTop={64}>
          <ListingsPagination
            total={listings.total}
            page={page}
            limit={PAGE_LIMIT}
            setPage={setPage}
          />
        </Affix>
        <Affix offsetTop={64}>
          <ListingsFilters filter={filter} setFilter={setFilter} />
        </Affix>

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
