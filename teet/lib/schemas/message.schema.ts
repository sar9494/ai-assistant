import { gql } from "apollo-server-micro";

export const messageDefs = gql`
  type Message {
    id: ID!
    userId: Int!
    user: User!
    content: String!
    answered: Boolean!
    received: Boolean!
    createdAt: Date!
  }
  input CreateMessageInput {
    userId: Int!
    content: String!
    received: Boolean!
  }
  input DeleteMessageInput {
    id: ID!
  }

  type Mutation {
    createMessage(input: CreateMessageInput!): Response!
    deleteMessage(input: DeleteMessageInput!): Response!
  }

  type Query {
    unansweredMessages: [Message!]!
  }
`;
