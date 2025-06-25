"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unansweredMessages = void 0;
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
const unansweredMessages = async () => {
    try {
        const messages = await prismaClient_1.default.message.findMany({
            where: { received: false, answered: false },
        });
        if (!messages || messages.length === 0) {
            throw new Error("Message олдсонгүй.");
        }
        return messages;
    }
    catch (error) {
        throw new Error("Internet server error");
    }
};
exports.unansweredMessages = unansweredMessages;
