import { gql } from "apollo-server-micro";

export const messageDefs = gql`
  type Message {
    id: ID!
    conversationId: Int!
    conversation: Conversation!
    content: String!
    answered: Boolean!
    received: Boolean!
    createdAt: Date!
  }
  input CreateMessageInput {
    conversationId: Int!
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
