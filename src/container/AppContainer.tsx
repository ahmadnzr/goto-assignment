"use client";

import React, { createContext, useEffect, useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Popup } from "@/components";

interface Props {
  children: React.ReactNode;
  padding?: string;
}

interface Error {
  isError: boolean;
  title: string;
  desc?: string;
}

interface AppCtx {
  globalError: Error | null;
  setGlobalError: (err: Error) => void;
}

const client = new ApolloClient({
  uri: "https://wpe-hiring.tokopedia.net/graphql",
  cache: new InMemoryCache(),
});

export const AppContext = createContext<AppCtx>({
  globalError: null,
  setGlobalError: () => {},
});

const AppContainer = ({ children, padding = "0px" }: Props) => {
  const [error, setError] = useState<Error>({
    title: "",
    desc: "",
    isError: false,
  });
  const [errPopup, setErrPopup] = useState(false);

  const handleSetGlobalError = (err: Error) => {
    setError(err);
    setErrPopup(true);
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider
        value={{ globalError: error, setGlobalError: handleSetGlobalError }}
      >
        {children}
        <Popup
          open={errPopup}
          title={error.title}
          desc={error.desc}
          handleYesBtn={() => setErrPopup(false)}
        />
      </AppContext.Provider>
    </ApolloProvider>
  );
};

export default AppContainer;
