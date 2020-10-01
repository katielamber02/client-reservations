import React from "react";
import { HomePriorities } from "./components/HomePriorities";
import { Layout } from "antd";
import mapBackground from "./assets/map-background.jpg";
import { RouteComponentProps } from "react-router-dom";

const { Content } = Layout;

export const Home = ({ history }: RouteComponentProps) => {
  const onSearch = (value: string) => {
    history.push(`/listings/${value}`);
  };
  return (
    <Content
      className="home"
      style={{ backgroundImage: `url(${mapBackground})` }}
    >
      <HomePriorities onSearch={onSearch} />
    </Content>
  );
};
