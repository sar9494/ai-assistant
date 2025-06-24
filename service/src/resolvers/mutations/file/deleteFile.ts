import { MutationResolvers, Response } from "../../../generated";
import prisma from "../../../prismaClient";

export const deleteFile: MutationResolvers["deleteFile"] = async (
  _,
  { input }
) => {
  const { fileId } = input;
  try {
    if (!fileId) {
      throw new Error("File id required");
    }
    await prisma.file.findUnique({
      where: {
        fileId,
      },
    });

    return Response.Success;
  } catch (error) {
    throw new Error("Internal server error : delete file");
  }
};
