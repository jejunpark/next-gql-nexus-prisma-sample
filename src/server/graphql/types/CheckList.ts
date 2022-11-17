import { nonNull, objectType, enumType } from "nexus";

export const CheckList = objectType({
  name: "CheckList",
  definition(t) {
    t.int("id");
    t.date("createdAt");
    t.date("updatedAt");
    t.string("title");
    t.boolean("isCompleted");
    t.field("toDo", { type: "ToDo" });
    t.int("toDoId");
  },
});
