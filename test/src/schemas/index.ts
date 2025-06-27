import { mergeTypeDefs } from "@graphql-tools/merge";
import { typeDefs as CommonTypeDefs } from "./common.schema";
import { userDefs } from "./user.schema";
import { messageDefs } from "./message.schema";
import { fileDefs } from "./file.schema";

export const typeDefs = mergeTypeDefs([
  CommonTypeDefs,
  messageDefs,
  userDefs,
  fileDefs,
]);
