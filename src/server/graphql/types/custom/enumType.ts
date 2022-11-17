import { enumType } from "nexus";

export const Importance = enumType({
  name: "Importance",
  members: ["LOW", "MEDIUM", "HIGH"],
});
