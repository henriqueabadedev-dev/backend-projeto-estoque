
import { SupplierReturnPromisse } from "../interfaces/SupplierDTO";
import { prisma } from "../libs/prismaInstance";

export default async function PushSuplierDB(
  suplier: any
): Promise<SupplierReturnPromisse> {


  const Fornecedor = await prisma.suplier.create({
    data: {
      idFornecedor: suplier.id,
      nomeFornecedor: suplier.nomeFornecedor,
      enderecoFornecedor: suplier.enderecoFornecedor,
      telefoneFornecedor: suplier.telefoneFornecedor,
      produtoFornecedor: suplier.produtoFornecedor,
      cepFornecedor: suplier.cepFornecedor,
    },
  });

 
  return Fornecedor;
}
