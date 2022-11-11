import { ApolloServer } from "apollo-server-micro";
import { DateTimeResolver } from "graphql-scalars";
import { NextApiHandler } from "next";
import { asNexusMethod, makeSchema } from "nexus";
import * as allTypes from "@server/graphql/types";
import * as Resolvers from "@server/graphql/resolvers";
import { createContext } from "@server/apollo/context";
import { applyMiddleware } from "graphql-middleware";
import { scalarType } from "nexus";
import { PATHNAME } from "@client/const";

import path from "path";
import cors from "micro-cors";

export const JSONScalar = scalarType({
  name: "JSON",
  asNexusMethod: "json",
  // check out graphql-type-json for inspiration on how to handle the rest of the scalar constructor
});

export const GQLDate = asNexusMethod(DateTimeResolver, "date");

export const schema = makeSchema({
  types: [allTypes, Resolvers, GQLDate, JSONScalar],
  outputs: {
    typegen: path.join(process.cwd(), "src/shared/generated/nexus-typegen.ts"),
    schema: path.join(process.cwd(), "src/shared/generated/schema.graphql"),
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  schema: applyMiddleware(schema),
  context: createContext,
});

let apolloServerHandler: NextApiHandler;

async function getApolloServerHandler() {
  if (!apolloServerHandler) {
    const startServer = await apolloServer.start();

    apolloServerHandler = apolloServer.createHandler({
      path: PATHNAME.GRAPHQL,
    });
  }

  return apolloServerHandler;
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler();

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  return apolloServerHandler(req, res);
};

export default cors()(handler);
