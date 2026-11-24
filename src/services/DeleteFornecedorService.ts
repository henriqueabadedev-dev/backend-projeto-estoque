import DeleteFornecedorRepositorie from "../repositories/DeleteFornecedorRepositorie";


export default async function DeleteFornecedorService(id: any): Promise<void> {
  try {
     const response = await DeleteFornecedorRepositorie(id);
     return response
  } catch (error) {
    console.error("Erro no serviço do Fornecedor:", (error as Error).message);
    throw error;
  }
}
