"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInformation = void 0;
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
const userInformation = async (_, { userId }) => {
    try {
        const user = await prismaClient_1.default.user.findUnique({
            where: { id: userId },
            include: { messages: true },
        });
        if (!user) {
            throw new Error("Хэрэглэгч олдсонгүй.");
        }
        return user;
    }
    catch (error) {
        throw new Error("Internet server error");
    }
};
exports.userInformation = userInformation;
