"use client";

import React from "react";
import styled from "@emotion/styled";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

interface Props {
  children: React.ReactNode;
  padding?: string;
}

const client = new ApolloClient({
  uri: "https://wpe-hiring.tokopedia.net/graphql",
  cache: new InMemoryCache(),
});

const ContentWrapper = ({ children, padding = "0px" }: Props) => {
  return (
    <ApolloProvider client={client}>
      <Wrapper padding={padding}>{children}</Wrapper>
    </ApolloProvider>
  );
};

const Wrapper = styled.div`
  width: var(--max-width);
  height: 100%;
  margin: 0 auto;
  padding: ${(props: { padding: string }) => props.padding};
`;

export default ContentWrapper;
