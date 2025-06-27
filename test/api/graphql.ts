import { createYoga } from "graphql-yoga";
import { typeDefs } from "../src/schemas";
import { resolvers } from "../src/resolvers";
import { makeExecutableSchema } from "@graphql-tools/schema";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
});

export default yoga;
