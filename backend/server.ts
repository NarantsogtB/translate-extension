import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/translate.schema";
import { resolvers } from "./resolvers";

type Context = {
  env: string;
};

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(process.env.PORT) || 4200 },

  context: async () => {
    return {
      env: process.env.NODE_ENV || "development",
    };
  },
});

console.log(`🚀 Server ready at ${url}`);
