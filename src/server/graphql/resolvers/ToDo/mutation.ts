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
        content: nonNull(stringArg()),
        importance: arg({ type: "Importance" }),
      },
      resolve: (_, { title, content, importance }, ctx) => {
        return prisma.toDo.create({
          data: {
            title: title,
            content: content,
            importance: importance,
          },
        });
      },
    });

    t.field("ToDoUpdate", {
      type: "ToDo",
      args: {
        id: nonNull(stringArg()),
        title: nullable(stringArg()),
        content: nullable(stringArg()),
        isDone: nullable(booleanArg()),
        importance: arg({ type: "Importance" }),
      },
      resolve: (_, { id, title, content, isDone, importance }, ctx) => {
        return prisma.toDo.update({
          where: {
            id: id,
          },
          data: {
            title: title,
            content: content,
            isDone: isDone,
            importance: importance,
          },
        });
      },
    });
  },
});
