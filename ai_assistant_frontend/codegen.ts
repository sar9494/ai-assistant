import * as dotenv from "dotenv";
dotenv.config(); // Load from .env

import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql", // fallback to empty string
  documents: ["src/**/*.graphql"],
  generates: {
    "src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
