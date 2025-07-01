import * as dotenv from "dotenv";
dotenv.config(); // Load from .env

import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/api/graphql",
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
        avoidOptionals: true,
        maybeValue: "T | null",
        strictScalars: true,
        scalars: {
          JSON: "{ [key: string]: unknown }",
          Date: "string",
        },
      },
    },
  },
};

export default config;
