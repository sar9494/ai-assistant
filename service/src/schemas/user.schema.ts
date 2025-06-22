import gql from "graphql-tag";

export const userDefs = gql`

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
`;
