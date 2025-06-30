import prisma from "../../../../prismaClient";

export const unansweredMessages = async () => {
  try {
    const messages = await prisma.message.findMany({
      where: { received: false, answered: false },
    });

    return messages;
  } catch (error) {
    throw new Error("Internet server error");
  }
};
