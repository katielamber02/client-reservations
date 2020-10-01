import React from "react";
import { HomePriorities } from "./components/HomePriorities";
import { Layout } from "antd";

const { Content } = Layout;
export const Home = () => {
  return (
    <Content className="home">
      <HomePriorities />
    </Content>
  );
};
