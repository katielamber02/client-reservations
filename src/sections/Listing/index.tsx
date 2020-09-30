import React, { useState } from "react";
import { Create } from "./components/ListingCreateReservation";
import { useQuery } from "@apollo/react-hooks";
import { LISTING } from "../../lib/graphql/queries";
import {
  ListingVariables,
  Listing as ListingData,
} from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { RouteComponentProps } from "react-router-dom";
import { PageSkeleton, ErrorBanner } from "../../lib/components";
import { Col, Layout, Row } from "antd";
import { ListingDetails, ListingReservations } from "./components";

const PAGE_LIMIT = 3;
const { Content } = Layout;

interface MatchParams {
  id: string;
}
export const Listing = ({ match }: RouteComponentProps<MatchParams>) => {
  const [reservationsPage, setReservationsPage] = useState(1);
  const { loading, data, error } = useQuery<ListingData, ListingVariables>(
    LISTING,
    {
      variables: {
        id: match.params.id,
        reservationsPage,
        limit: PAGE_LIMIT,
      },
    }
  );
  if (loading) {
    return (
      <Content className="listings">
        <PageSkeleton />
      </Content>
    );
  }
  const listing = data ? data.listing : null;
  const listingReservations = listing ? listing.reservations : null;

  const listingDetailsElement = listing ? (
    <ListingDetails listing={listing} />
  ) : null;

  const listingReservationsElement = listingReservations ? (
    <ListingReservations
      listingReservations={listingReservations}
      reservationsPage={reservationsPage}
      limit={PAGE_LIMIT}
      setReservationsPage={setReservationsPage}
    />
  ) : null;

  if (error) {
    return (
      <Content className="listings">
        <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon!" />
        <PageSkeleton />
      </Content>
    );
  }
  return (
    <Content className="listings">
      <Create />
      <Row gutter={24} justify="space-between">
        <Col xs={24} lg={14}>
          {listingDetailsElement}
          {listingReservationsElement}
        </Col>
      </Row>
    </Content>
  );
};
