import prisma from "@server/prisma";
import { PrismaClient } from "@prisma/client";
import { Context } from "@server/apollo/types";

const APP_SECRET = process.env.APP_SECRET;

export function createContext(ctx: Context): Context {
  return {
    ...ctx,
    prisma,
  };
}
