"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
const connectPinecone_1 = require("../../../connectPinecone");
const mammoth_1 = __importDefault(require("mammoth"));
const promises_1 = __importDefault(require("fs/promises"));
const assistant = connectPinecone_1.pinecone.Assistant("ai-assistant");
const uploadFile = async (req, res) => {
    var _a;
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ error: "Missing file path" });
        }
        const name = req.body.name;
        const filePath = req.file.path;
        const result = await mammoth_1.default.extractRawText({ path: filePath });
        const text = result.value;
        const txtPath = `uploads/${name}.txt`;
        await promises_1.default.writeFile(txtPath, text, "utf-8");
        await assistant.uploadFile({
            path: txtPath,
            metadata: { uploadedBy: "admin" },
        });
        const files = await assistant.listFiles();
        const newFile = (_a = files.files) === null || _a === void 0 ? void 0 : _a.filter((file) => file.name.includes(txtPath.split("/")[1]));
        if (!newFile) {
            return res.status(400).json({ error: "File not found" });
        }
        await prismaClient_1.default.file.create({
            data: {
                fileId: newFile[0].id,
                name,
                url: txtPath,
            },
        });
        res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Upload failed" });
    }
};
exports.uploadFile = uploadFile;
