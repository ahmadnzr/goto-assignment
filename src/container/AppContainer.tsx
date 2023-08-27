"use client";

import React from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

interface Props {
  children: React.ReactNode;
  padding?: string;
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`GraphQL Error: ${message}`);
    });
  }

  if (networkError) {
    console.error(`Network Error: ${networkError}`);
  }
});

const httpLink = createHttpLink({
  uri: "https://wpe-hiring.tokopedia.net/graphql",
});

const combinedLink = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link: combinedLink,
  cache: new InMemoryCache(),
});

const AppContainer = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AppContainer;
