import { prisma } from "../libs/prismaInstance";

export default async function FindClientByIdService(
  Id: any
): Promise<any[]> {
  const client = await prisma.client.findMany({
    where: {
      id: Id.id,
      deletedAt: false,
    },
  });

  if (!client) {
    throw new Error("Cliente não encontrado");
  }

  return client;
}
