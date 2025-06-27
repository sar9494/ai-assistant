"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByName = void 0;
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
const searchByName = async (_, { input }) => {
    try {
        const { name } = input;
        const searchedFiles = await prismaClient_1.default.file.findMany({
            where: name
                ? {
                    name: {
                        contains: name,
                        mode: "insensitive",
                    },
                }
                : {},
        });
        return searchedFiles;
    }
    catch (error) {
        console.error("Search error:", error);
        throw new Error("Серверийн алдаа.");
    }
};
exports.searchByName = searchByName;
