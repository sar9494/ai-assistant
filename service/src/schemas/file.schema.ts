import gql from "graphql-tag";

export const fileDefs = gql`
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
  type Mutation {
    uploadFile(input: UploadFileInput!): Response!
  }
`;
