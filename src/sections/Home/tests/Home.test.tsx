import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { Home } from "../index";

describe("Home", () => {
  
  window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

  describe("search input", () => {
    it("renders an empty search input on initial render", () => {
      const history = createMemoryHistory();
      render(
        <MockedProvider mocks={[]}>
          <Router history={history}>
            <Home />
          </Router>
        </MockedProvider>
      );
    });
  });
});