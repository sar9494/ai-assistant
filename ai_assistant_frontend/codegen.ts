import * as dotenv from "dotenv";
dotenv.config(); // Load from .env

import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL || "", // fallback to empty string
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
