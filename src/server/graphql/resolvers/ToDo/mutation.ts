import {
  asNexusMethod,
  makeSchema,
  nonNull,
  nullable,
  objectType,
  extendType,
  list,
  arg,
  stringArg,
  intArg,
  booleanArg,
} from "nexus";
import prisma from "@server/prisma";

export const ToDoMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("ToDoCreate", {
      type: "ToDo",
      args: {
        title: nonNull(stringArg()),
        importance: arg({ type: "Importance" }),
      },
      resolve: async (_, { title, importance }, ctx) => {
        return prisma.toDo.create({
          data: {
            title: title,
            importance: importance,
          },
        });
      },
    });

    t.field("ToDoUpdate", {
      type: "ToDo",
      args: {
        id: nonNull(intArg()),
        title: nullable(stringArg()),
        isDone: nullable(booleanArg()),
        importance: arg({ type: "Importance" }),
      },
      resolve: async (_, { id, title, isDone, importance }, ctx) => {
        return prisma.toDo.update({
          where: {
            id: id,
          },
          data: {
            title: title,
            isDone: isDone,
            importance: importance,
          },
        });
      },
    });

    t.field("ToDoDelete", {
      type: "ToDo",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, { id }, ctx) => {
        return prisma.toDo.delete({
          where: {
            id: id,
          },
        });
      },
    });
  },
});
