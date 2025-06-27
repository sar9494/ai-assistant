import { Pinecone } from "@pinecone-database/pinecone";

export const pinecone = new Pinecone({
  apiKey:
    "pcsk_6H2ySU_UH9qxwRvn4ADZgfwCrMRC4aFM2MjRw2SFyLbU1YxPAAMf4m6TWzS1mkfArCKToj",
});

export const index = pinecone.index("ai-assistant");
