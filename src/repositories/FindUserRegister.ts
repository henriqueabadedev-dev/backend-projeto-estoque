import { prisma } from "../libs/prismaInstance";

export default async function FindUserRegister(userDTO: any): Promise<any> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userDTO,
      },
    });

    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erro no FindUserRegister:", (error as Error).message);
    throw error;
  } 
}
