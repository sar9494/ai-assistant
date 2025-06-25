import { pinecone } from "../../../connectPinecone";
import { MutationResolvers, Response } from "../../../generated";
import prisma from "../../../prismaClient";

const assistant = pinecone.Assistant("ai-assistant");

export const deleteFile: MutationResolvers["deleteFile"] = async (
  _,
  { input }
) => {
  const { id } = input;
  try {
    if (!id) {
      throw new Error("File id required");
    }
    const file = await prisma.file.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!file) {
      throw new Error("File id required");
    }
    assistant.deleteFile(file?.fileId);

    await prisma.file.delete({
      where: {
        id: Number(id),
      },
    });

    return Response.Success;
  } catch (error) {
    throw new Error("Internal server error : delete file");
  }
};
