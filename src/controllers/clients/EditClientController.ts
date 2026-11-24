import { FastifyRequest, FastifyReply } from "fastify";
import ClientEditService from "../../services/ClientEditService";

export async function EditClienteController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const id: string | any = request.params;
  const data: any = request.body;
  try {
    await ClientEditService(id, data);

    reply.statusCode = 201;
    return { message: "Cliente Editado!" };
  } catch (error) {
    reply.statusCode = 500;
    console.error(error);
    return { error: "Erro no servidor do cliente edit" };
  }
}
