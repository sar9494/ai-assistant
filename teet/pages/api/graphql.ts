import { createYoga, createSchema } from "graphql-yoga";
import { typeDefs } from "../../lib/schemas";
import { resolvers } from "../../lib/resolvers";

const schema = createSchema({
  typeDefs,
  resolvers,
});

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
