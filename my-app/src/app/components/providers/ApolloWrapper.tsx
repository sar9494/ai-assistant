"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";

// Apollo Client тохиргоо
const client = new ApolloClient({
  uri:
    // process.env.NODE_ENV === "production"
    //   ?
    // "https://ai-backend-lime.vercel.app/api/graphql",
    "http://localhost:4000/api/graphql",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "ignore",
    },
    query: {
      errorPolicy: "all",
    },
  },
});

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
