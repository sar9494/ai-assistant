import { MutationResolvers, Response } from "../../../generated";
import prisma from "../../../prismaClient";

export const createUser: MutationResolvers["createUser"] = async (
  _,
  { input }
) => {
  const { email, password, name } = input;

  try {
    await prisma.user.create({
      data: {
        email,
        password,
        name,
        role: "ADMIN",
      },
    });

    return Response.Success;
  } catch (error) {
    console.log(error);

    throw new Error("Internal server error");
  }
};
