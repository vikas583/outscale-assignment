import { ProjectReplyStatus } from "../types";

export const enumToString = (val: any) => {
  switch (val) {
    case ProjectReplyStatus.opsTeam:
      return "Operations Team";
    case ProjectReplyStatus.revTeam:
      return "Revenue Team";
  }
  return val;
};
