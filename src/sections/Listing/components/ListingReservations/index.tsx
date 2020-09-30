import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Divider, List, Typography } from "antd";
import { Listing } from "../../../../lib/graphql/queries/Listing/__generated__/Listing";

interface Props {
  listingReservations: Listing["listing"]["reservations"];
  reservationsPage: number;
  limit: number;
  setReservationsPage: (page: number) => void;
}

const { Text, Title } = Typography;

export const ListingReservations = ({
  listingReservations,
  reservationsPage,
  limit,
  setReservationsPage,
}: Props) => {
  const total = listingReservations ? listingReservations.total : null;
  const result = listingReservations ? listingReservations.result : null;

  const listingReservationsList = listingReservations ? (
    <List
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 3,
      }}
      dataSource={result ? result : undefined}
      locale={{ emptyText: "No reservations have been made yet!" }}
      pagination={{
        current: reservationsPage,
        total: total ? total : undefined,
        defaultPageSize: limit,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page: number) => setReservationsPage(page),
      }}
      renderItem={(listingReservation) => {
        const reservationHistory = (
          <div className="listing-bookings__history">
            <div>
              Check in: <Text strong>{listingReservation.checkIn}</Text>
            </div>
            <div>
              Check out: <Text strong>{listingReservation.checkOut}</Text>
            </div>
          </div>
        );

        return (
          <List.Item className="listing-bookings__item">
            {reservationHistory}
            <Link to={`/user/${listingReservation.tenant.id}`}>
              <Avatar
                src={listingReservation.tenant.avatar}
                size={64}
                shape="square"
              />
            </Link>
          </List.Item>
        );
      }}
    />
  ) : null;

  const listingReservationsElement = listingReservationsList ? (
    <div className="listing-bookings">
      <Divider />
      <div className="listing-bookings__section">
        <Title level={4}>Bookings</Title>
      </div>
      {listingReservationsList}
    </div>
  ) : null;

  return listingReservationsElement;
};
