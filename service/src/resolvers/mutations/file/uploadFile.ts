import { MutationResolvers, Response } from "../../../generated";
import prisma from "../../../prismaClient";

export const uploadFile: MutationResolvers["uploadFile"] = async (
  _,
  { input }
) => {
  const { name, fileId, url } = input;
  try {
    await prisma.file.create({
      data: {
        name,
        fileId,
        url,
      },
    });
    return Response.Success;
  } catch (error) {
    throw new Error("Internal server error:upload file");
  }
};
