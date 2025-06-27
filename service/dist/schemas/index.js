"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const merge_1 = require("@graphql-tools/merge");
const common_schema_1 = require("./common.schema");
const user_schema_1 = require("./user.schema");
const message_schema_1 = require("./message.schema");
const file_schema_1 = require("./file.schema");
exports.typeDefs = (0, merge_1.mergeTypeDefs)([
    common_schema_1.typeDefs,
    message_schema_1.messageDefs,
    user_schema_1.userDefs,
    file_schema_1.fileDefs,
]);
