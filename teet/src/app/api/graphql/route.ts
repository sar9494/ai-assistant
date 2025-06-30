// pages/api/graphql.ts
import { createSchema, createYoga } from "graphql-yoga";
import { resolvers } from "../../../../lib/resolvers";
import { typeDefs } from "../../../../lib/schemas";

const schema = createSchema({
  typeDefs,
  resolvers,
});

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql", // optional
});

export { handleRequest as GET, handleRequest as POST };

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
