import { File, QueryResolvers } from "../../../generated";
import prisma from "../../../prismaClient";

export const searchByName: QueryResolvers["searchByName"] = async (
  _,
  { input }
) => {
  try {
    const { name } = input;

    const searchedFiles = await prisma.file.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    if (!searchedFiles.length) {
      throw new Error("Файл олдсонгүй.");
    }

    return searchedFiles as unknown as File[];
  } catch (error) {
    throw new Error("Серверийн алдаа.");
  }
};
