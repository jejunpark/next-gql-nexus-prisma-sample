import { nonNull, objectType, enumType } from "nexus";

export const ToDo = objectType({
  name: "ToDo",
  definition(t) {
    t.int("id");
    t.date("createdAt");
    t.date("updatedAt");
    t.string("title");
    t.field("importance", { type: "Importance" });
    t.boolean("isDone");
    t.list.field("checkLists", { type: "CheckList" });
  },
});

export const ToDoCount = objectType({
  name: "ToDoCount",
  definition(t) {
    t.int("total");
    t.int("done");
  },
});

export const ToDoItems = objectType({
  name: "ToDoItems",
  definition(t) {
    t.list.field("items", { type: "ToDo" });
    t.int("_count");
  },
});
