import {
  asNexusMethod,
  makeSchema,
  nonNull,
  nullable,
  objectType,
  extendType,
  list,
  stringArg,
  intArg,
  booleanArg,
  arg,
} from "nexus";
import prisma from "@server/prisma";

export const ToDoQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("ToDoItemQuery", {
      type: "ToDo",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx) => {
        return prisma.toDo.findUnique({
          where: {
            id: id,
          },
        });
      },
    });

    t.list.field("ToDoItemsQuery", {
      type: "ToDo",
      args: {
        isDone: nullable(booleanArg()),
        importance: nullable(arg({ type: "Importance" })),
        skip: nullable(intArg()),
        take: nullable(intArg()),
      },
      resolve: async (_, { isDone, importance, skip, take }, ctx) => {
        return prisma.toDo.findMany({
          where: {
            isDone: isDone ?? undefined,
            importance: importance ?? undefined,
          },
          skip: skip ?? 0,
          take: take ?? 10,
        });
      },
    });
  },
});
