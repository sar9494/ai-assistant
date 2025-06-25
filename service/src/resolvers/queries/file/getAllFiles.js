"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.files = void 0;
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
const files = async () => {
    try {
        const files = await prismaClient_1.default.file.findMany();
        console.log(files);
        return files;
    }
    catch (error) {
        throw new Error("Internet server error");
    }
};
exports.files = files;
