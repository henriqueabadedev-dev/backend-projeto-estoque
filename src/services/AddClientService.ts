import PushClientDB from "../repositories/CreateClienteRepositorie";

export default async function ClientService(
  Client: any
): Promise<void> {
  try {
     const response = await PushClientDB(Client);
     console.log(response)
  } catch (error) {
    console.error("Erro no serviço do Cliente:", (error as Error).message);
    throw error;
  }
}
