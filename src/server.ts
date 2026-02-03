import { ApolloServer } from '@apollo/server';
import 'dotenv/config';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

interface MyContext {
  env: string;
  requestId: string;
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4210 },
  context: async () => ({
    env: process.env.NODE_ENV || 'development',
    requestId: crypto.randomUUID(),
  }),
});

console.log(`🚀  Server ready at: ${url}`);
