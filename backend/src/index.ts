import { createYoga, createSchema } from "graphql-yoga";
import { createContext, type Context } from "./context";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schemas";

export const yoga = createYoga({
  schema: createSchema<Context>({
    typeDefs,
    resolvers,
  }),
  context: createContext,
});
