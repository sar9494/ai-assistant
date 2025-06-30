import prisma from "../../../../prismaClient";
import { MutationResolvers, Response } from "../../../generated";

export const createConversation: MutationResolvers["createConversation"] =
  async (_, { input }) => {
    const { userId, messages } = input;

    try {
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        throw new Error(`User does not exist`);
      }

      const finalTitle = messages[0].content.slice(0, 30)

      await prisma.conversation.create({
        data: {
          title: finalTitle,
          userId,
          messages: {
            create: messages.map(
              (msg: {
                content: string;
                received: boolean;
                answered?: boolean;
              }) => ({
                content: msg.content,
                received: msg.received,
                answered: msg.answered ?? false,
              })
            ),
          },
        },
      });

      return Response.Success;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create conversation with messages");
    }
  };
