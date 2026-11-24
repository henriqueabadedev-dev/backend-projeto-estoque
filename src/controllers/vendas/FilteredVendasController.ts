import { FastifyRequest, FastifyReply } from "fastify";
import FilterVendaRepositorie from "../../repositories/FilteredVendasRepositorie";

export async function FilteredVendasController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const Value: any = request.params;
  const query: any = request.query;
  try {
    const response = await FilterVendaRepositorie(Value, query);
    return response;
  } catch (error) {
    console.log(error);
    reply.statusCode = 500;
    return { error: "Erro no servidor" };
  }
}
