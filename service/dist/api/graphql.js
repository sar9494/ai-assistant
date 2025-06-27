"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const schemas_1 = require("../src/schemas");
exports.default = (0, graphql_yoga_1.createSchema)({ typeDefs: schemas_1.typeDefs });
