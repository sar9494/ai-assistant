import prisma from "context";
import { MutationResolvers, Response } from "generated";

export const createUser: MutationResolvers["createUser"] = async (
  _,
  { input }
) => {
  const { email, password } = input;

  try {
    await prisma.user.create({
      data: {
        email,
        password,
        role: "ADMIN",
      },
    });

    return Response.Success;
  } catch (error) {
    console.log(error);

    throw new Error("Internal server error");
  }
};
