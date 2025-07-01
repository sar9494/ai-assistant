import express from "express";
import { createConversation, deleteConversation } from "../resolvers/mutations";
import { getConversations } from "../resolvers/queries";

export const conversationRouter = express.Router();
conversationRouter.post("/", createConversation);
conversationRouter.delete("/", deleteConversation);
conversationRouter.get("/", getConversations);
