import express from "express";
import { createMessage, deleteMessage } from "../resolvers/mutations";
import { unansweredMessages } from "../resolvers/queries";

export const messageRouter = express.Router();
messageRouter.post("/", createMessage);
messageRouter.delete("/", deleteMessage);
messageRouter.get("/unanswered", unansweredMessages);
