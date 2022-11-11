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

export const CheckListMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("CheckListCreate", {
      type: "CheckList",
      args: {
        content: nonNull(stringArg()),
        toDoId: nonNull(stringArg()),
      },
      resolve: (_, { content, toDoId }, ctx) => {
        return prisma.checkList.create({
          data: {
            content: content,
            toDo: {
              connect: {
                id: toDoId,
              },
            },
          },
        });
      },
    });

    t.field("CheckListUpdate", {
      type: "CheckList",
      args: {
        id: nonNull(stringArg()),
        content: nullable(stringArg()),
        isCompleted: nullable(booleanArg()),
      },
      resolve: (_, { id, content, isCompleted }, ctx) => {
        return prisma.checkList.update({
          where: {
            id: id,
          },
          data: {
            content: content ?? undefined,
            isCompleted: isCompleted ?? undefined,
          },
        });
      },
    });
  },
});
