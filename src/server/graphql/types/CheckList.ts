import { nonNull, objectType, enumType } from "nexus";

export const CheckList = objectType({
  name: "CheckList",
  definition(t) {
    t.string("id");
    t.date("createdAt");
    t.date("updatedAt");
    t.string("content");
    t.boolean("isCompleted");
    t.field("toDo", { type: "ToDo" });
    t.string("toDoId");
  },
});
