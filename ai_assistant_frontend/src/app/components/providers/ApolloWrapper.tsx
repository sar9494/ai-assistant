// "use client";

// import { HttpLink } from "@apollo/client";
// import {
//   ApolloNextAppProvider,
//   InMemoryCache,
//   ApolloClient,
// } from "@apollo/client-integration-nextjs";

// import { PropsWithChildren } from "react";
// import { setContext } from "@apollo/client/link/context";

// const uri =
//   process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL ??
//   "http://localhost:4000/api/graphql";

// const makeClient = () => {
//   const httpLink = new HttpLink({
//     uri,
//     // fetchOptions: { cache: "no-store", mode: "cors" },
//   });

//   const authLink = setContext((_, { headers }) => {
//     return {
//       headers: {
//         ...headers,
//       },
//     };
//   });

//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: authLink.concat(httpLink),
//   });
// };

// export const ApolloWrapper = ({ children }: PropsWithChildren) => {
//   return (
//     <ApolloNextAppProvider makeClient={makeClient}>
//       {children}
//     </ApolloNextAppProvider>
//   );
// };
"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { PropsWithChildren } from "react";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL, // Make sure this port matches your backend
  credentials: "include", // Include if you need cookies/auth
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
