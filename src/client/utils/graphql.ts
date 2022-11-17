import { GraphQLClient } from "graphql-request";
import { PATHNAME } from "@client/const";

export const graphQLClient = new GraphQLClient(PATHNAME.GRAPHQL_FULL_PATH);
