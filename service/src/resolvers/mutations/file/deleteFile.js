"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const connectPinecone_1 = require("../../../connectPinecone");
const generated_1 = require("../../../generated");
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
const assistant = connectPinecone_1.pinecone.Assistant("ai-assistant");
const deleteFile = async (_, { input }) => {
    const { id } = input;
    try {
        if (!id) {
            throw new Error("File id required");
        }
        const file = await prismaClient_1.default.file.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!file) {
            throw new Error("File id required");
        }
        assistant.deleteFile(file === null || file === void 0 ? void 0 : file.fileId);
        await prismaClient_1.default.file.delete({
            where: {
                id: Number(id),
            },
        });
        return generated_1.Response.Success;
    }
    catch (error) {
        throw new Error("Internal server error : delete file");
    }
};
exports.deleteFile = deleteFile;
