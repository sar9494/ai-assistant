"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./generated/prisma/client"); // ✅ output замтай таарна
const prisma = new client_1.PrismaClient();
exports.default = prisma;
