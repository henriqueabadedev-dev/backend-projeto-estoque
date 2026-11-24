import { prisma } from "../libs/prismaInstance";
import { Sale, SaleReturnPromisse } from "../interfaces/Venda";

export default async function CreateNewVenda(
  paymentMethod: string,
  total: number,
  clientId: string,
  statusPagamento: string
): Promise<any> {
  const product = await prisma.sales.create({
    data: {
      statusPagamento: statusPagamento,
      paymentMethod: paymentMethod,
      total: total,
      clientId: clientId,
      valorParcial: total
    },
  });


  if (!product) {
    throw new Error("Erro no repositorie de Vendas");
  }
  return product;
}
