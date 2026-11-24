import { prisma } from "../libs/prismaInstance";

export default async function EditVendaRepositorie(
  iD: any,
  data: any
): Promise<any> {
  const venda = await prisma.sales.update({
    where: { id: iD.id },
    data: {
      paymentMethod: data.paymentMethod,
      statusPagamento: data.statusPagamento,
      total: data.total,
      valorParcial: data.valorParcial
    },
  });

  return venda;
}
