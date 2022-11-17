import gql from "graphql-tag";

export const COMMON_CHECK_LIST_FRAGMENT = `
    id
    createdAt
    updatedAt
    title
    isCompleted
    toDoId
`;

export const CHECK_LIST_CREATE = gql`
  mutation Mutation($title: String!, $toDoId: Int!) {
    CheckListCreate(title: $title, toDoId: $toDoId) {
      ${COMMON_CHECK_LIST_FRAGMENT}
      toDo {
        id
        createdAt
        updatedAt
        title
        importance
        isDone
      }
    }
  }
`;

export const CHECK_LIST_UPDATE = gql`
  mutation Mutation(
    $id: Int!
    $title: String
    $isCompleted: Boolean
  ) {
    CheckListUpdate(
      id: $id
      title: $title
      isCompleted: $isCompleted
    ) {
      ${COMMON_CHECK_LIST_FRAGMENT}
      toDo {
        id
        createdAt
        updatedAt
        title
        importance
        isDone
      }
    }
  }
`;

export const CHECK_LIST_DELETE = gql`
  mutation Mutation($id: Int!) {
    CheckListDelete(id: $id) {
      ${COMMON_CHECK_LIST_FRAGMENT}
    }
  }
`;
