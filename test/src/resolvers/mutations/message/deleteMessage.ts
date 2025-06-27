import prisma from "context";
import { MutationResolvers, Response } from "generated";

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
    throw new Error("Failed to delete message");
  }
};
