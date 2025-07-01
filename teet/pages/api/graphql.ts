import { resolvers } from "../../lib/resolvers";
import { typeDefs } from "../../lib/schemas";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextApiRequest, NextApiResponse } from "next";

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req: NextApiRequest, res: NextApiResponse) => ({ req, res }),
});

function cors(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const origin =
    //  "https://ai-frontend-ruby.vercel.app"
    "http://localhost:3000";

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
}

export default function graphqlHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise<void>((resolve, reject) => {
    cors(req, res, async () => {
      try {
        await handler(req, res);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}
