import prisma from "../../../context";
import { MutationResolvers, Response } from "../../../generated";

export const createMessage: MutationResolvers["createMessage"] = async (
  _,
  { input }
) => {
  const { content, received, userId } = input;
  await prisma.message.create({
    data: {
      content,
      userId,
      received,
    },
  });
  return Response.Success;
};
