import express from "express";
import { deleteFile } from "../resolvers/mutations";
import { files, searchByName } from "../resolvers/queries";
import { getByType } from "../resolvers/queries/file/getByType";

export const fileRouter = express.Router();
// fileRouter.post("/", uploadFile);
fileRouter.delete("/", deleteFile);
fileRouter.get("/allFiles", files);
fileRouter.get("/searchName", searchByName);
fileRouter.get("/byType", getByType);
