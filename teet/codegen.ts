import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "lib/schemas",
  generates: {
    "lib/generated/index.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../../lib/types/index.js#Context",
        makeResolverTypeCallable: true,
        maybeValue: "T",
      },
    },
  },
};

export default config;
