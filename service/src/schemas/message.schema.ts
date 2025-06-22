import gql from "graphql-tag";

export const messageDefs = gql`
  type Message {
    id: ID!
    userId: Int!
    user:User!
    content: String!
    received:Boolean!
    createdAt: Date!
  }
  input CreateMessageInput {
    userId: Int!
    content: String!
    received:Boolean!
  }
  type Mutation {
    createMessage(input: CreateMessageInput!): Response!
  }
`;
