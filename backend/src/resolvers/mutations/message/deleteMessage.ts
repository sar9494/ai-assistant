import { MutationResolvers, Response } from "../../../generated";
import prisma from "../../../prismaClient";

export const deleteMessage: MutationResolvers["deleteMessage"] = async (
  _,
  { input }
) => {
  const { id } = input;

  try {
    if (!id) {
      throw new Error("Message id required");
    }
    await prisma.message.delete({
      where: { id: Number(id) },
    });
    return Response.Success;
  } catch (error) {
    throw new Error(`Internet server error ${error}`);
  }
};
