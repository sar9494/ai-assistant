"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const generated_1 = require("../../../generated");
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
const createUser = async (_, { input }) => {
    const { email, password } = input;
    try {
        await prismaClient_1.default.user.create({
            data: {
                email,
                password,
                role: "ADMIN",
            },
        });
        return generated_1.Response.Success;
    }
    catch (error) {
        console.log(error);
        throw new Error("Internal server error");
    }
};
exports.createUser = createUser;
