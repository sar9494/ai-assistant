import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  scalar JSON

  scalar Date

  enum Response {
    Success
  }

  type Query {
    sampleQuery: String!
  }

  type Mutation {
    sampleMutation: String!
  }
`;
