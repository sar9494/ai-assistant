"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.messageDefs = (0, graphql_tag_1.default) `
  type Message {
    id: ID!
    userId: Int!
    user:User!
    content: String!
    answered:Boolean!
    received:Boolean!
    createdAt: Date!
  }
  input CreateMessageInput {
    userId: Int!
    content: String!
    received:Boolean!
  }
  input DeleteMessageInput {
    id:ID!
      }

  type Mutation {
    createMessage(input: CreateMessageInput!): Response!
    deleteMessage(input: DeleteMessageInput!): Response!
  }

  type Query {
    unansweredMessages: [Message!]!
  }
`;
