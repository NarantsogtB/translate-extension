import gql from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    health: String!
  }

  type Mutation {
    translate(text: String!, to: String!): Translation!
  }

  type Translation {
    translatedText: String!
    cached: Boolean!
  }
`;
