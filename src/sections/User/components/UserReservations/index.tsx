import React from "react";
import { List, Typography } from "antd";
import { ListingCard } from "../../../../lib/components";
import { User } from "../../../../lib/graphql/queries/User/__generated__/User";

interface Props {
  userReservations: User["user"]["reservations"];
  reservationsPage: number;
  limit: number;
  setReservationsPage: (page: number) => void;
}

const { Paragraph, Text, Title } = Typography;

export const UserReservations = ({
  userReservations,
  reservationsPage,
  limit,
  setReservationsPage,
}: Props) => {
  const total = userReservations ? userReservations.total : null;
  const result = userReservations ? userReservations.result : null;

  const userReservationsList = userReservations ? (
    <List
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 4,
      }}
      dataSource={result ? result : undefined}
      locale={{ emptyText: "You haven't made any reservations!" }}
      pagination={{
        position: "top",
        current: reservationsPage,
        total: total ? total : undefined,
        defaultPageSize: limit,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page: number) => setReservationsPage(page),
      }}
      renderItem={(userReservation) => {
        const reservationHistory = (
          <div className="user-bookings__booking-history">
            <div>
              Check in: <Text strong>{userReservation.checkIn}</Text>
            </div>
            <div>
              Check out: <Text strong>{userReservation.checkOut}</Text>
            </div>
          </div>
        );

        return (
          <List.Item>
            {reservationHistory}
            <ListingCard listing={userReservation.listing} />
          </List.Item>
        );
      }}
    />
  ) : null;

  const userReservationsElement = userReservationsList ? (
    <div className="user-bookings">
      <Title level={4} className="user-bookings__title">
        Reservations
      </Title>
      <Paragraph className="user-bookings__description">
        This section highlights the resrvations you've made, and the
        check-in/check-out dates associated with said reservations.
      </Paragraph>
      {userReservationsList}
    </div>
  ) : null;

  return userReservationsElement;
};
