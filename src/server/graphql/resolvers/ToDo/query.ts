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

    t.field("ToDoItemsQuery", {
      type: "ToDoItems",
      args: {
        isDone: nullable(booleanArg()),
        importance: nullable(arg({ type: "Importance" })),
        skip: nullable(intArg()),
        take: nullable(intArg()),
      },
      resolve: async (_, { isDone, importance, skip, take }, ctx) => {
        const res = await prisma.toDo.findMany({
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
        const count = await prisma.toDo.count({
          where: {
            isDone: isDone ?? undefined,
            importance: importance ?? undefined,
          },
        });

        return {
          items: res,
          _count: count,
        };
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
