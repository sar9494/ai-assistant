import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
dotenv.config();

export const pinecone = new Pinecone({
  apiKey:
    "pcsk_SZp3h_NQxceA1fAF1AJhkgLQcQFUjc7oEoWk1HPyj4NvBUXob2YUCiMgPry7iKZLrcZk1",
});

export const assistant = pinecone.Assistant("ai-assistant");
