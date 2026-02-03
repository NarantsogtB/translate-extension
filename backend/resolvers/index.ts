import * as Mutation from "./mutations";
import * as Query from "./queries";

export const resolvers = {
  Query: {
    getQuery: Query.health,
  },
  Mutation: {
    translateToMongolia: Mutation.translateToMongolia,
  },
};
