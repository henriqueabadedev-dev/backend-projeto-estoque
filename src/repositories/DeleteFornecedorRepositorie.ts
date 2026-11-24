import { prisma } from "../libs/prismaInstance";

export default async function DeleteFornecedorRepositorie(
  iD: any
): Promise<any> {

  const client = await prisma.suplier.delete({
    where: {
      idFornecedor: iD.id,
    },
  });

  return client;
}
