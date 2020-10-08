import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { LISTING } from "../../lib/graphql/queries";
import {
  ListingVariables,
  Listing as ListingData,
} from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { RouteComponentProps } from "react-router-dom";
import { PageSkeleton, ErrorBanner } from "../../lib/components";
import { Col, Layout, Row } from "antd";
import {
  ListingDetails,
  ListingReservations,
  ListingCreateReservation,
  WrappedListingCreateReservationModal as ListingCreateReservationModal,
} from "./components";
import { Moment } from "moment";
import { Viewer } from "../../lib/types";

const PAGE_LIMIT = 3;
const { Content } = Layout;

interface Props {
  viewer: Viewer;
}
interface MatchParams {
  id: string;
}
export const Listing = ({
  viewer,
  match,
}: Props & RouteComponentProps<MatchParams>) => {
  const [reservationsPage, setReservationsPage] = useState(1);
  const [checkInDate, setCheckInDate] = useState<Moment | null | undefined>(
    null
  );
  const [checkOutDate, setCheckOutDate] = useState<Moment | null | undefined>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  const { loading, data, error, refetch } = useQuery<
    ListingData,
    ListingVariables
  >(LISTING, {
    variables: {
      id: match.params.id,
      reservationsPage,
      limit: PAGE_LIMIT,
    },
  });

  const clearReservationData = () => {
    setModalVisible(false);
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const handleListingRefetch = async () => {
    await refetch();
  };

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
  const ListingCreateReservationElement = listing ? (
    <ListingCreateReservation
      viewer={viewer}
      host={listing.host}
      price={listing.price}
      reservationsIndex={listing.reservationsIndex}
      checkInDate={checkInDate}
      checkOutDate={checkOutDate}
      setCheckInDate={setCheckInDate}
      setCheckOutDate={setCheckOutDate}
      setModalVisible={setModalVisible}
    />
  ) : null;

  const listingCreateReservationModalElement =
    listing && checkInDate && checkOutDate ? (
      <ListingCreateReservationModal
        id={listing.id}
        price={listing.price}
        modalVisible={modalVisible}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        setModalVisible={setModalVisible}
        clearReservationData={clearReservationData}
        handleListingRefetch={handleListingRefetch}
      />
    ) : null;

  return (
    <Content className="listings">
      <Row gutter={24} justify="space-between">
        <Col xs={24} lg={14}>
          {listingDetailsElement}
          {listingReservationsElement}
        </Col>
        <Col xs={24} lg={10}>
          {ListingCreateReservationElement}
        </Col>
      </Row>
      {listingCreateReservationModalElement}
    </Content>
  );
};
