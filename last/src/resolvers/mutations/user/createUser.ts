import prisma from "../../../../prismaClient";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await prisma.user.create({
      data: {
        email,
        password,
        role: "ADMIN",
      },
    });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);

    throw new Error("Internal server error");
  }
};
