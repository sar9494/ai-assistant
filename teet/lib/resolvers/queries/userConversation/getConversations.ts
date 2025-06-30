import prisma from "../../../../prismaClient";
import { Conversation, QueryResolvers } from "../../../generated";

export const getConversations: QueryResolvers["getConversations"] = async (
  _,
  { input }
) => {
  try {
    const { userId } = input;

    if (!userId || isNaN(Number(userId))) {
      throw new Error("Хэрэглэгчийн ID буруу байна.");
    }

    const userConversations = await prisma.conversation.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        user: true,   
        messages: true,
      },
    });

    return userConversations.map((conversation) => ({
      id: conversation.id.toString(),        // ✅ ID as string
      title: conversation.title,
      userId: conversation.userId,           // ✅ Keep as number
      createdAt: conversation.createdAt,
      user: {
        ...conversation.user,
        id: conversation.user.id.toString(), // ✅ Convert nested user.id to string
      },
      messages: conversation.messages.map((msg) => ({
        ...msg,
        id: msg.id.toString(),
        conversationId: msg.conversationId.toString(),
      })),
    })) as unknown as Conversation[];
  } catch (error) {
    throw new Error("Серверийн алдаа.");
  }
};
