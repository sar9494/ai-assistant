// lib/apollo-client.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // өөрийн backend URL
  cache: new InMemoryCache(),
});
