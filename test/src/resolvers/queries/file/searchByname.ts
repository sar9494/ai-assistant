import { File, QueryResolvers } from "../../../generated";
import prisma from "../../../context";

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

    return searchedFiles as unknown as File[];
  } catch (error) {
    console.error("Search error:", error);
    throw new Error("Серверийн алдаа.");
  }
};
