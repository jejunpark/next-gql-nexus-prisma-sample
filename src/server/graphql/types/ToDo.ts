import { nonNull, objectType, enumType } from "nexus";

export const ToDo = objectType({
  name: "ToDo",
  definition(t) {
    t.string("id");
    t.date("createdAt");
    t.string("title");
    t.string("content");
    t.field("importance", { type: "Importance" });
    t.boolean("isDone");
    t.list.field("checkLists", { type: "CheckList" });
  },
});
