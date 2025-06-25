"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const generated_1 = require("../../../generated");
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
const createMessage = async (_, { input }) => {
    const { content, received, userId } = input;
    await prismaClient_1.default.message.create({
        data: {
            content,
            userId,
            received
        }
    });
    return generated_1.Response.Success;
};
exports.createMessage = createMessage;
