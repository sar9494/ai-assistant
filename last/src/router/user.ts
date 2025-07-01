import express from "express";
import { createUser } from "../resolvers/mutations";
import { userInformation } from "../resolvers/queries";

export const userRouter = express.Router();
userRouter.post("/", createUser);
userRouter.get("/", userInformation);
