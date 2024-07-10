import { Person } from "@/features/Project/types.ts";

export const getInitials = (p: Person) => {
  const f = p.name.split(" ")[0][0];
  const l = p.name.split(" ")[1];
  return l ? f + l[0] : f;
};
