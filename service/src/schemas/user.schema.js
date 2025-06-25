"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.userDefs = (0, graphql_tag_1.default) `

  type User {
    id: ID!
    email: String!
    password: String!
    messages:[Message!]!
    createdAt: Date!
    role:UserRoleEnum!
  }
  
  enum UserRoleEnum {
  ADMIN
  EMPLOYEE
  }

  input CreateUserInput {
    email: String!
    password: String!
  }
  type Mutation {
    createUser(input: CreateUserInput!): Response!
  }

  type Query {
  userInformation(userId: Int!): User!
}
`;
