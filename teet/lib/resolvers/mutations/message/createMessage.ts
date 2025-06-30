import prisma from "../../../../prismaClient";
import { MutationResolvers,Response } from "../../../generated";


export const createMessage: MutationResolvers["createMessage"] = async (
  _,
  { input }: any
) => {
  const { content, received, conversationId } = input;
  await prisma.message.create({
    data: {
      conversationId,
      content,
      received,
    },
  });
  return Response.Success;
};
