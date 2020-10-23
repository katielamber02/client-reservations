import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { Home } from "../index";
import { LISTINGS } from '../../../lib/graphql/queries';
import { ListingsFilter } from '../../../lib/graphql/globalTypes'


describe("Home", () => {
    window.scrollTo = () => { }
    window.matchMedia = window.matchMedia || function () {
        return {
            matches: false,
            addListener: function () { },
            removeListener: function () { }
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
            it("renders the loading state when the query is loading", async () => {
                const history = createMemoryHistory();
                const { queryByText } = render(
                    <MockedProvider mocks={[]}>
                        <Router history={history}>
                            <Home />
                        </Router>
                    </MockedProvider>
                );

                await waitFor(() => {
                    expect(queryByText("Premium Listings - Loading")).not.toBeNull();
                    expect(queryByText("Premium Listings")).toBeNull();
                });
            });

            it("renders the intended UI when the query is successful", async () => {
                const listingsMock = {
                    request: {
                        query: LISTINGS,
                        variables: {
                            filter: ListingsFilter.PRICE_HIGH_TO_LOW,
                            limit: 4,
                            page: 1,
                        },
                    },
                    result: {
                        data: {
                            listings: {
                                region: null,
                                total: 10,
                                result: [
                                    {
                                        id: "1234",
                                        title: "Bev Hills",
                                        image: "image.png",
                                        address: "90210 Bev Hills",
                                        price: 9000,
                                        guests: 5,
                                    },
                                ],
                            },
                        },
                    },
                };

                const history = createMemoryHistory();
                const { queryByText } = render(
                    <MockedProvider mocks={[listingsMock]} addTypename={false}>
                        <Router history={history}>
                            <Home />
                        </Router>
                    </MockedProvider>
                )

                await waitFor(() => {
                    expect(queryByText("Premium Listings - Loading")).toBeNull();
                    expect(queryByText("Premium Listings")).not.toBeNull();
                });
            });

            it("does not render the loading section or the listings section when query has an error", async () => {
                const listingsMock = {
                    request: {
                        query: LISTINGS,
                        variables: {
                            filter: ListingsFilter.PRICE_HIGH_TO_LOW,
                            limit: 4,
                            page: 1,
                        },
                    },
                    error: new Error("Network Error"),
                };

                const history = createMemoryHistory();
                const { queryByText } = render(
                    <MockedProvider mocks={[listingsMock]} addTypename={false}>
                        <Router history={history}>
                            <Home />
                        </Router>
                    </MockedProvider>
                );

                await waitFor(() => {
                    expect(queryByText("Premium Listings")).toBeNull();
                    expect(queryByText("Premium Listings - Loading")).toBeNull();
                });
            });
        });
    });
});
