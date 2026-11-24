import { prisma } from "../libs/prismaInstance";

export default async function FindProductQuantity(produto: any): Promise<any> {

  const product = await prisma.product.findMany({
    where: {
      id: produto.id,
    },
  });

  if (!product) {
    throw new Error("Usuário não encontrado");
  }

  return product;
}
