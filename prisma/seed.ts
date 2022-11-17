import { Importance, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tasks = Array.from(Array(15).keys());

const handleMakeToDoItem = async (item: number) => {
  const res = await prisma.toDo.create({
    data: {
      title: `To Do ${15 - item}`,
      importance:
        item < 5
          ? Importance.LOW
          : item < 10
          ? Importance.MEDIUM
          : Importance.HIGH,
      isDone: item % 2 === 0,
    },
  });
  await prisma.checkList.createMany({
    data: Array.from(Array(2).keys()).map((i) => {
      return {
        title: `Check List${i + 1} of To Do${15 - item}`,
        toDoId: res.id,
        isCompleted: item % 2 === 0,
      };
    }),
  });
  console.log(`Sample Data Create.. (${item + 1}/15)`);
};

async function main() {
  for (const item of tasks) {
    await handleMakeToDoItem(item);
  }
  console.log("Sample Data Create Completed!!");
}

main()
  .catch((e) => console.log(e))
  .finally(() => prisma.$disconnect);
