import { FastifyRequest, FastifyReply } from "fastify";
import AddProductService from "../../services/AddProductService";

export async function CreateProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  console.log(request.body);
  try {
    const data: any = request.body;
    await AddProductService(data);
    reply.statusCode = 201;
    return { message: "Produto criado!" };
  } catch (error) {
    reply.statusCode = 500;
    console.error(error);
    return { error: "Erro no servidor" };
  }
}
