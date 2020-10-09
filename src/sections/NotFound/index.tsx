import React, { Fragment } from "react";
import { Empty, Layout, Typography } from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;
const { Text } = Typography;
export const NotFound = () => {
  return (
    <Content className="not-found">
      <Empty
        description={
          <Fragment>
            <Text className="not-found__description-title">
              Something went wrong!
            </Text>
            <Text className="not-found__description-subtitle">
              The page you are looking for can't be found!
            </Text>
          </Fragment>
        }
      />
      <Link
        to="/"
        className="not found__cta ant-btn ant-btn-primary ant-btn-large"
      >
        Got to Home Page
      </Link>
    </Content>
  );
};
