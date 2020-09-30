import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { USER } from ".././../lib/graphql/queries";

import {
  User as UserData,
  UserVariables,
} from "../../lib/graphql/queries/User/__generated__/User";
import { RouteComponentProps } from "react-router-dom";
import { Col, Layout, Row } from "antd";
import { UserProfile } from "./components";

interface MatchParams {
  id: string;
}
const { Content } = Layout;
export const User = ({ match }: RouteComponentProps<MatchParams>) => {
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id,
    },
  });
  const user = data ? data.user : null;
  const userProfileElement = user ? <UserProfile user={user} /> : null;

  return (
    <Content className="user">
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
      </Row>
    </Content>
  );
};
