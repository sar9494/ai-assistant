"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    overwrite: true,
    schema: "src/schemas",
    generates: {
        "src/generated/index.ts": {
            plugins: ["typescript", "typescript-resolvers"],
            config: {
                contextType: "../types#Context",
                makeResolverTypeCallable: true,
                maybeValue: "T",
            },
        },
    },
};
exports.default = config;
