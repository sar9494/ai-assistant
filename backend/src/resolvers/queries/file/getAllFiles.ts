import prisma from "../../../prismaClient";

export const files = async () => {
  try {
    const files = await prisma.file.findMany();
    console.log(files);
    return files;
  } catch (error) {
    throw new Error(`Internet server error ${error}`);
  }
};
