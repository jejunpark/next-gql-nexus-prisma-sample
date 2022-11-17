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
        title: nonNull(stringArg()),
        toDoId: nonNull(intArg()),
      },
      resolve: (_, { title, toDoId }, ctx) => {
        return prisma.checkList.create({
          data: {
            title: title,
            toDo: {
              connect: {
                id: toDoId,
              },
            },
          },
          include: {
            toDo: true,
          },
        });
      },
    });

    t.field("CheckListUpdate", {
      type: "CheckList",
      args: {
        id: nonNull(intArg()),
        title: nullable(stringArg()),
        isCompleted: nullable(booleanArg()),
      },
      resolve: (_, { id, title, isCompleted }, ctx) => {
        return prisma.checkList.update({
          where: {
            id: id,
          },
          data: {
            title: title ?? undefined,
            isCompleted: isCompleted ?? undefined,
          },
          include: {
            toDo: true,
          },
        });
      },
    });

    t.field("CheckListDelete", {
      type: "CheckList",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, ctx) => {
        return prisma.checkList.delete({
          where: {
            id: id,
          },
        });
      },
    });
  },
});
