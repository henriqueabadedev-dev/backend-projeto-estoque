import { Sale } from "../interfaces/Venda";
import EditVendaRepositorie from "../repositories/EditVendaRepositorie";

type VendaUpdateData = Omit<Sale, "id" | "createdAt" | "updatedAt">;

export default async function EditVendaService(
  id: any,
  venda: any
): Promise<void> {
  console.log(venda);
  try {
    const cleanData: any = {
      clientId: venda.clientId,
      paymentMethod: venda.paymentMethod,
      statusPagamento: venda.statusPagamento,
      total: venda.total.replace(/[R$\s\.]/g, "").replace(",", "."),
      valorParcial: venda.valorParcial.replace(/[R$\s\.]/g, "").replace(",", ".")
    };

    await EditVendaRepositorie(id, cleanData);
  } catch (error) {
    console.error("Erro no serviço do Edit vendas:", (error as Error).message);
    throw error;
  }
}
