import { Product } from "./Product";


export interface Sale {
    products: {
        idProduto: string,
        quantidade: number
    }[],
    desconto: number
    clientId: string,
    statusPagamento: string
    paymentMethod: string
}

export interface SaleReturnPromisse {
  id: string;
  products: [];
  clientId: string;
  statusPagamento: string;
  paymentMethod: string;
}
