require("./config/dotenv");
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const { makeExecutableSchema } = require("graphql-tools");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const { prisma } = require("./generated/prisma-client");
const { resolvers } = require("./api");
const directiveResolvers = require("./directives");
const app = require("./config/express");
const corsConfig = require("./config/cors");
const getSessionUser = require("./utils/getSessionUser");

const typeDefs = importSchema(`${__dirname}/schema.graphql`);
const apollo = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
    directiveResolvers
  }),
  context: async ({ req, res, connection }) => {
    const sessionUser = req
      ? await getSessionUser(req.signedCookies.sessionId, prisma)
      : connection.context.sessionUser;

    return { sessionUser, prisma, req, res };
  },
  subscriptions: {
    onConnect: async (_, ws) => {
      const cookies = ws.upgradeReq.headers.cookie;
      const signedCookies =
        cookies &&
        cookieParser.signedCookies(
          cookie.parse(cookies),
          process.env.SIGNED_COOKIE_SECRET
        );
      return {
        sessionUser:
          signedCookies &&
          (await getSessionUser(signedCookies.sessionId, prisma))
      };
    }
  },
  tracing: true,
  debug: true,
  introspection: true
});

apollo.applyMiddleware({ app, cors: corsConfig });

const server = http.createServer(app);

// Add subscription support
apollo.installSubscriptionHandlers(server);

server.listen({ port: process.env.SERVER_PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${process.env.SERVER_PORT}${
      apollo.graphqlPath
    }`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${process.env.SERVER_PORT}${
      apollo.subscriptionsPath
    }`
  );
});
