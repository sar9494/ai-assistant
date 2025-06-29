import prisma from "../../../../prismaClient";
import {  QueryResolvers } from "../../../generated";


export const searchByName: QueryResolvers["searchByName"] = async (
  _,
  { input }
) => {
  try {
    const { name } = input;

    const searchedFiles = await prisma.file.findMany({
      where: name
        ? {
            name: {
              contains: name,
              mode: "insensitive",
            },
          }
        : {},
    });

    return searchedFiles.map((file) => ({
      id: file.id.toString(), // Prisma's ID is number, GraphQL ID is string
      name: file.name,
      url: file.url,
      fileId: file.fileId,
      createdAt: file.createdAt.toISOString(), // Prisma's Date → GraphQL Date
    }));
  } catch (error) {
    console.error("Search error:", error);
    throw new Error("Серверийн алдаа.");
  }
};
