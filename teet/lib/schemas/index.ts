import { mergeTypeDefs } from "@graphql-tools/merge";
import { typeDefs as CommonTypeDefs } from "./common.schema";
import { userDefs } from "./user.schema";
import { messageDefs } from "./message.schema";
import { fileDefs } from "./file.schema";
import { conversationDefs } from "./conversation.schema";

export const typeDefs = mergeTypeDefs([
  CommonTypeDefs,
  messageDefs,
  userDefs,
  fileDefs,
  conversationDefs
]);
