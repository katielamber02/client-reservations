import React from "react";
import { Link } from "react-router-dom";
import { Layout, Typography } from "antd";
import { Viewer } from "../../lib/types";

const { Content } = Layout;
const { Text, Title } = Typography;

export interface Props {
  viewer: Viewer;
}
export const Host = ({ viewer }: Props) => {
  if (!viewer.id || !viewer.hasWallet) {
    return (
      <Content className="host-content">
        <div className="host__form-header">
          <Title level={4} className="host__form-title">
            You'll have to be signed in and connected with Stripe to host a
            listing!
          </Title>
          <Text type="secondary">
            We only allow users who've signed in to our application and have
            connected with Stripe to host new listings. You can sign in at the{" "}
            <Link to="/login">/login</Link> page and connect with Stripe shortly
            after.
          </Text>
        </div>
      </Content>
    );
  }
  return (
    <Content className="host-content">
      <div className="host__form-header">
        <Title level={3} className="host__form-title">
          Hi! Let's get started listing your place.
        </Title>
        <Text type="secondary">
          In this form, we'll collect some basic and additional information
          about your listing.
        </Text>
      </div>
    </Content>
  );
};
