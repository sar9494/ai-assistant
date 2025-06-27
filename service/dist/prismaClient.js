"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma/src/generated/prisma"); // ✅ output замтай таарна
const prisma = new prisma_1.PrismaClient();
exports.default = prisma;
