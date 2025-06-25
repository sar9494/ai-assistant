"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = void 0;
const generated_1 = require("../../../generated");
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
const deleteMessage = async (_, { input }) => {
    const { id } = input;
    try {
        if (!id) {
            throw new Error("Message id required");
        }
        await prismaClient_1.default.message.delete({
            where: { id: Number(id) },
        });
        return generated_1.Response.Success;
    }
    catch (error) {
        throw new Error("Failed to delete message");
    }
};
exports.deleteMessage = deleteMessage;
