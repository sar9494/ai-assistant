"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const node_1 = require("@graphql-yoga/node");
const schema_1 = require("@graphql-tools/schema");
const resolvers_1 = require("resolvers");
const schemas_1 = require("schemas");
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: schemas_1.typeDefs, resolvers: resolvers_1.resolvers });
const yoga = (0, node_1.createYoga)({ schema });
function handler(req, res) {
    return yoga.handleNodeRequest(req, res);
}
