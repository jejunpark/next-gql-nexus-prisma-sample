-- CreateEnum
CREATE TYPE "Importance" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "ToDo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "importance" "Importance" NOT NULL DEFAULT 'LOW',
    "isDone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ToDo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckList" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "toDoId" INTEGER NOT NULL,

    CONSTRAINT "CheckList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Misc" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Misc_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ToDo_createdAt_idx" ON "ToDo"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "CheckList_createdAt_idx" ON "CheckList"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "CheckList" ADD CONSTRAINT "CheckList_toDoId_fkey" FOREIGN KEY ("toDoId") REFERENCES "ToDo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
