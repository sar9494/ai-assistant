import { MutationResolvers, Response } from "../../../generated";
import prisma from "../../../prismaClient";

export const createUser: MutationResolvers["createUser"] = async (_, { input }) => {
  const { email, password } = input;
console.log(input);

  try {
    console.log(input);
const allUser=await prisma.user.findMany()
console.log("prob",allUser);

    const newuser=await prisma.user.create({
      data: {
        email,
        password,
        role:'EMPLOYEE'
      },
    });
    console.log(newuser);
    

    return Response.Success;
  } catch (error) {
    console.log(error);
    
    throw new Error("Internal server error");
  }
};
