import { createYoga, createSchema, YogaInitialContext } from "graphql-yoga";
import { typeDefs } from "../../../../lib/schemas";
import { resolvers } from "../../../../lib/resolvers";

const schema = createSchema<{ req: Request } & YogaInitialContext>({
  typeDefs,
  resolvers,
});

const yoga = createYoga<{
  req: Request;
}>({
  schema,
  graphqlEndpoint: "/api/graphql",
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"], // Add your frontend URLs
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Changed to true if you need cookies/auth
  },
  fetchAPI: { Request, Response },
});

// Handle preflight OPTIONS requests
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000", // Your frontend URL
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export const GET = yoga.handleRequest;
export const POST = yoga.handleRequest;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
