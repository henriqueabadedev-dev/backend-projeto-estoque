import { FastifyRequest, FastifyReply } from "fastify";
import FindProduct from "../../repositories/findProduct";

export async function FindProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params: any = request.params;
  try {
    const response = await FindProduct(params, request.query);
    return response;
  } catch (error) {
    console.log(error);
    reply.statusCode = 500;
    return { error: "Erro no servidor" };
  }
}
