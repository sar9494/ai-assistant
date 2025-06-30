"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  InMemoryCache,
  ApolloClient,
} from "@apollo/client-integration-nextjs";

import { PropsWithChildren } from "react";
import { setContext } from "@apollo/client/link/context";

const uri =
  process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL ??
  "http://localhost:8000/api/graphql";

const makeClient = () => {
  const httpLink = new HttpLink({
    uri,
    fetchOptions: { cache: "no-store" },
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ?? "",
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
};

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
