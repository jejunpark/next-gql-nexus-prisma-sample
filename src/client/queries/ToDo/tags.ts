import gql from "graphql-tag";

export const COMMON_TO_DO_FRAGMENT = `
  id
  createdAt
  updatedAt
  title
  importance
  isDone
`;

export const TO_DO_ITEM_QUERY = gql`
  query Query($toDoItemQueryId: Int!) {
    ToDoItemQuery(id: $toDoItemQueryId) {
      ${COMMON_TO_DO_FRAGMENT}
      checkLists {
        id
        createdAt
        updatedAt
        title
        isCompleted
      }
    }
  }
`;

export const TO_DO_ITEMS_QUERY = gql`
  query Query(
    $isDone: Boolean
    $importance: Importance
    $skip: Int
    $take: Int
  ) {
    ToDoItemsQuery(
      isDone: $isDone
      importance: $importance
      skip: $skip
      take: $take
    ) {
      ${COMMON_TO_DO_FRAGMENT}
      checkLists {
        id
        createdAt
        updatedAt
        title
        isCompleted
      }
    }
  }
`;

export const TO_DO_CREATE = gql`
  mutation Mutation($title: String!, $importance: Importance) {
    ToDoCreate(title: $title, importance: $importance) {
      ${COMMON_TO_DO_FRAGMENT}
    }
  }
`;

export const TO_DO_UPDATE = gql`
  mutation Mutation(
    $id: Int!
    $title: String
    $isDone: Boolean
    $importance: Importance
  ) {
    ToDoUpdate(
      id: $id
      title: $title
      isDone: $isDone
      importance: $importance
    ) {
      ${COMMON_TO_DO_FRAGMENT}
    }
  }
`;

export const TO_DO_DELETE = gql`
  mutation Mutation($id: Int!) {
    ToDoDelete(id: $id) {
      ${COMMON_TO_DO_FRAGMENT}
    }
  }
`;

export const TO_DO_ITEMS_COUNT_QUERY = gql`
  query Query {
    ToDoItemsCountQuery {
      total
      done
    }
  }
`;
