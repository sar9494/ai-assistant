import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
dotenv.config();

export const pinecone = new Pinecone({
  apiKey:
    "pcsk_6H2ySU_UH9qxwRvn4ADZgfwCrMRC4aFM2MjRw2SFyLbU1YxPAAMf4m6TWzS1mkfArCKToj",
});

const index = pinecone.index("ai-assistant");
