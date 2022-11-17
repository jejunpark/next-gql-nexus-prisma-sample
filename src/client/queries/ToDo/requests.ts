import {
  NexusGenArgTypes,
  NexusGenObjects,
} from "@root/src/shared/generated/nexus-typegen";
import { graphQLClient } from "../../utils";
import {
  TO_DO_ITEMS_QUERY,
  TO_DO_CREATE,
  TO_DO_ITEMS_COUNT_QUERY,
  TO_DO_UPDATE,
  TO_DO_DELETE,
} from "./tags";

export const toDoItemsQuery = async (
  variables: NexusGenArgTypes["Query"]["ToDoItemsQuery"]
): Promise<{
  ToDoItemsQuery: NexusGenObjects["ToDoItems"];
}> => {
  return await graphQLClient.request(TO_DO_ITEMS_QUERY, variables);
};

export const toDoItemsCountQuery = async (): Promise<{
  ToDoItemsCountQuery: NexusGenObjects["ToDoCount"];
}> => {
  return await graphQLClient.request(TO_DO_ITEMS_COUNT_QUERY);
};

export const toDoCreateMutation = async (
  variables: NexusGenArgTypes["Mutation"]["ToDoCreate"]
): Promise<{
  ToDoCreate: NexusGenObjects["ToDo"];
}> => {
  return await graphQLClient.request(TO_DO_CREATE, variables);
};

export const toDoUpdateMutation = async (
  variables: NexusGenArgTypes["Mutation"]["ToDoUpdate"]
): Promise<{
  ToDoUpdate: NexusGenObjects["ToDo"];
}> => {
  return await graphQLClient.request(TO_DO_UPDATE, variables);
};

export const toDoDeleteMutation = async (
  variables: NexusGenArgTypes["Mutation"]["ToDoDelete"]
): Promise<{
  ToDoDelete: NexusGenObjects["ToDo"];
}> => {
  return await graphQLClient.request(TO_DO_DELETE, variables);
};
