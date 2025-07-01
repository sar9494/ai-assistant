import prisma from "../../../prismaClient";

export const unansweredMessages = async () => {
  try {
    const messages = await prisma.message.findMany({
      where: { received: false, answered: false },
      include: {
        user: true,
        file: true,
      },
    });
    if (!messages || messages.length === 0) {
      return [];
    }
    return messages.map((msg) => ({
      ...msg,
      status: msg.answered
        ? "success"
        : !msg.answered && !msg.received
        ? "pending"
        : "irrelevant",
    }));
  } catch (error) {
    throw new Error("Internet server error");
  }
};
