import {
  NexusGenArgTypes,
  NexusGenObjects,
} from "@root/src/shared/generated/nexus-typegen";
import { graphQLClient } from "../../utils";
import {
  CHECK_LIST_CREATE,
  CHECK_LIST_DELETE,
  CHECK_LIST_UPDATE,
} from "./tags";

export const checkListCreateMutation = async (
  variables: NexusGenArgTypes["Mutation"]["CheckListCreate"]
): Promise<{
  CheckListCreate: NexusGenObjects["CheckList"];
}> => {
  return await graphQLClient.request(CHECK_LIST_CREATE, variables);
};

export const checkListUpdateMutation = async (
  variables: NexusGenArgTypes["Mutation"]["CheckListUpdate"]
): Promise<{
  CheckListUpdate: NexusGenObjects["CheckList"];
}> => {
  return await graphQLClient.request(CHECK_LIST_UPDATE, variables);
};

export const checkListDeleteMutation = async (
  variables: NexusGenArgTypes["Mutation"]["CheckListDelete"]
): Promise<{
  CheckListDelete: NexusGenObjects["CheckList"];
}> => {
  return await graphQLClient.request(CHECK_LIST_DELETE, variables);
};
