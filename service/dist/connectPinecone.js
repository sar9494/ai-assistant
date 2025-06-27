"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinecone = void 0;
const pinecone_1 = require("@pinecone-database/pinecone");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pinecone = new pinecone_1.Pinecone({
    apiKey: "pcsk_6H2ySU_UH9qxwRvn4ADZgfwCrMRC4aFM2MjRw2SFyLbU1YxPAAMf4m6TWzS1mkfArCKToj",
});
const index = exports.pinecone.index("ai-assistant");
