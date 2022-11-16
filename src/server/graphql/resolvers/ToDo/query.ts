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
        id: nonNull(intArg()),
      },
      resolve: async (_, { id }, ctx) => {
        return prisma.toDo.findUnique({
          where: {
            id: id,
          },
          include: {
            checkLists: true,
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
          orderBy: {
            createdAt: "desc",
          },
          include: {
            checkLists: {
              orderBy: {
                id: "asc",
              },
            },
          },
          skip: skip ?? undefined,
          take: take ?? undefined,
        });
      },
    });

    t.field("ToDoItemsCountQuery", {
      type: "ToDoCount",
      resolve: async (_, {}, ctx) => {
        const total = await prisma.toDo.count();
        const done = await prisma.toDo.count({
          where: {
            isDone: true,
          },
        });
        return { total, done };
      },
    });
  },
});
