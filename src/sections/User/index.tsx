import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { USER } from ".././../lib/graphql/queries";
import { Viewer } from "../../lib/types";

import {
  User as UserData,
  UserVariables,
} from "../../lib/graphql/queries/User/__generated__/User";
import { RouteComponentProps } from "react-router-dom";
import { Col, Layout, Row } from "antd";
import { UserProfile, UserListings, UserReservations } from "./components";
import { PageSkeleton, ErrorBanner } from "../../lib/components";

interface MatchParams {
  id: string;
}
interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}
const { Content } = Layout;

const PAGE_LIMIT = 4;

export const User = ({
  viewer,
  setViewer,
  match,
}: Props & RouteComponentProps<MatchParams>) => {
  const [listingsPage, setListingsPage] = useState(1);
  const [reservationsPage, setReservationsPage] = useState(1);

  const { data, loading, error, refetch } = useQuery<UserData, UserVariables>(
    USER,
    {
      variables: {
        id: match.params.id,
        reservationsPage,
        listingsPage,
        limit: PAGE_LIMIT,
      },
    }
  );
  const handleUserRefetch = async () => {
    await refetch();
  };
  if (loading) {
    return (
      <Content className="user">
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }
  const user = data ? data.user : null;
  const userListings = user ? user.listings : null;
  const userReservations = user ? user.reservations : null;

  const viewerIsUser = viewer.id === match.params.id;

  const userProfileElement = user ? (
    <UserProfile
      user={user}
      viewerIsUser={viewerIsUser}
      setViewer={setViewer}
      viewer={viewer}
      handleUserRefetch={handleUserRefetch}
    />
  ) : null;

  const userListingsElement = userListings ? (
    <UserListings
      userListings={userListings}
      listingsPage={listingsPage}
      limit={PAGE_LIMIT}
      setListingsPage={setListingsPage}
    />
  ) : null;

  const userReservationsElement = userListings ? (
    <UserReservations
      userReservations={userReservations}
      reservationsPage={reservationsPage}
      limit={PAGE_LIMIT}
      setReservationsPage={setReservationsPage}
    />
  ) : null;

  return (
    <Content className="user">
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
        <Col xs={24}>{userListingsElement}</Col>
        <Col xs={24}>{userReservationsElement}</Col>
      </Row>
    </Content>
  );
};
