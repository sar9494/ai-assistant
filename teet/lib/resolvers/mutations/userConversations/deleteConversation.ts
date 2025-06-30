import prisma from "../../../../prismaClient";
import { MutationResolvers, Response } from "../../../generated";


export const deleteConversation: MutationResolvers["deleteConversation"] = async (
  _,
  { input }
) => {
  const { id } = input;

  try {
    if (!id) {
      throw new Error("Conversation id required");
    }
    await prisma.conversation.delete({
      where: { id: Number(id) },
    });
    return Response.Success;
  } catch (error) {
    throw new Error("Failed to delete message");
  }
};
