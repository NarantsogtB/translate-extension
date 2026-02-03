import gql from "graphql-tag";

export const typeDefs = gql`
  type Translation {
    text: String!
    detectedFrom: String
  }

  input EnglishToMongolianInput {
    text: String!
    to: String!
  }
  type Health {
    text: String!
  }
  type Mutation {
    translateToMongolia(input: EnglishToMongolianInput!): Translation!
  }

  type Query {
    getQuery: Health!
  }
`;
