import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolver.js";
import db from "./datasources/db.js";
import { getUser } from "./modules/auth.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const token = req.headers.authorization?.split("Bearer ")?.[1];
    console.log("token", token);
    const user = token ? getUser(token) : null;
    console.log("user", user);
    return {
      dataSources: {
        db,
      },
      user,
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
