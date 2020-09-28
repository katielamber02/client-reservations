import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import {
  Home,
  Host,
  Listing,
  Listings,
  NotFound,
  User,
  Login,
} from "./sections";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";
import { Layout } from "antd";
import { Viewer } from "./lib/types";

const client = new ApolloClient({
  uri: "/api",
});

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};
const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  console.log("[Viewer]:", viewer);
  // [Viewer]: {id: "100360416195713761162", token: "aafdcceec3228660c6104f7543c3310e", avatar: "https://lh4.googleusercontent.com/-FPNUiswLGzg/AAA…AMZuucnILtd9TO8j5QXB3fdvPEJQ52YrJw/s100/photo.jpg", hasWallet: null, didRequest: true, …}
  return (
    <Router>
      <Layout id="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} setViewer={setViewer} />}
          />
          <Route exact path="/host" component={Host} />
          <Route exact path="/listing/:id" component={Listing} />
          {/* <Route exact path="/listings/:location?" component={Listings} /> */}
          <Route
            path="/listings"
            render={(props) => <Listings {...props} title="Hello" />}
          />
          <Route exact path="/user/:id" component={User} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
