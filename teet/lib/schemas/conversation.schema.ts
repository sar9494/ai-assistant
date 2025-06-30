import { gql } from "apollo-server-micro";

export const conversationDefs = gql`
  type Message {
    id: ID!
    content: String!
    answered: Boolean!
    received: Boolean!
    createdAt: Date!
  }

  type Conversation {
    id: ID!
    title: String
    userId: Int!
    user: User!
    messages: [Message!]!
    createdAt: Date!
  }

  input CreateMessageInput {
    content: String!
    received: Boolean!
  }

  input CreateConversationInput {
    title: String
    userId: Int!
    messages: [CreateMessageInput!]!
  }

  input DeleteConversationInput {
    id: ID!
  }

  input GetConversationInput {
    userId: Int!
  }

  type Mutation {
    createConversation(input: CreateConversationInput!): Response!
    deleteConversation(input: DeleteConversationInput!): Response!
  }

  type Query {
    getConversations(input:GetConversationInput!): [Conversation!]!
  }
`;
