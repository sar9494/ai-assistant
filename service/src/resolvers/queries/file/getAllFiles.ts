import prisma from "../../../prismaClient";

export const files = async () => {
  try {
    const files = await prisma.file.findMany()
    if (!files || files.length === 0) {
      throw new Error('File олдсонгүй.');
    }
    return files;
  } catch (error) {
    throw new Error('Internet server error');
  }
};
