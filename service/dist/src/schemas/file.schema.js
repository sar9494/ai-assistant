"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.fileDefs = (0, graphql_tag_1.default) `
  type File {
    id: ID!
    name: String!
    url: String!
    fileId: String!
    createdAt: Date!
  }

  input UploadFileInput {
    name: String!
    url: String!
    fileId: String!
  }
  input DeleteFileInput {
    id: ID!
  }
  type Mutation {
    uploadFile(input: UploadFileInput!): Response!
    deleteFile(input: DeleteFileInput!): Response!
  }
  input SearchByNameInput {
    name: String
  }

  type Query {
    files: [File!]!
    searchByName(input: SearchByNameInput!): [File!]!
  }
`;
