import prisma from "../../../../prismaClient";
import { QueryResolvers, User } from "../../../generated";

export const userInformation: QueryResolvers["userInformation"] = async (
  _,
  { userId }
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: 1 },
      include: { conversation: true },
    });

    return user as unknown as User;
  } catch (error) {
    throw new Error("Internet server error");
  }
};
