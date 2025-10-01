import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ prisma, req }),
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
}

startServer();