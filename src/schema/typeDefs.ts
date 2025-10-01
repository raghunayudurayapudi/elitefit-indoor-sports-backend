import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    email: String!
    name: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    hello: String!
    users: [User!]!
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!, name: String): User!
    login(email: String!, password: String!): String!
  }
`;

export default typeDefs;
