import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { render, waitFor,fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { Home } from "../index";

describe("Home", () => {
    window.scrollTo = () => { }
  window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

  describe("search input", () => {
    it("renders an empty search input on initial render", async () => {
      const history = createMemoryHistory();
      const { getByPlaceholderText } = render(
        <MockedProvider mocks={[]}>
          <Router history={history}>
            <Home />
          </Router>
        </MockedProvider>
      );
        // https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0
        await waitFor(() => {
            const searchInput = getByPlaceholderText(
                "Search 'San Fransisco'"
            ) as HTMLInputElement;

            expect(searchInput.value).toEqual("");
        })
      });
 
    it("redirects the user to the /listings page when a valid search is provided", async () => {
  const history = createMemoryHistory();
  const { getByPlaceholderText } = render(
    <MockedProvider mocks={[]}>
      <Router history={history}>
        <Home />
      </Router>
    </MockedProvider>
  );

  await waitFor(() => {
    const searchInput = getByPlaceholderText(
      "Search 'San Fransisco'"
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: "Toronto" } });
    fireEvent.keyDown(searchInput, {
      key: "Enter",
      keyCode: 13,
    });

    expect(history.location.pathname).toBe("/listings/Toronto");
    });
    });
    describe("premium listings", () => {
    it("renders the loading state when the query is loading", async () => {});

    it("renders the intended UI when the query is successful", async () => {});

    it("does not render the loading section or the listings section when query has an error", async () => {});
    });
       });
});
