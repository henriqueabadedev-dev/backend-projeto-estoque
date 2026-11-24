import {FastifyRequest, FastifyReply} from 'fastify'
import ClientService from '../../services/AddClientService';
import FindClientByIdService from '../../repositories/FindClientByIdRepositorie';

export async function FindClientByIdController(request:FastifyRequest, reply: FastifyReply) {
  try {
    const id = request.params
    const client = await FindClientByIdService(id);
    reply.statusCode = 201
    return client
  } catch (error) {
    reply.statusCode = 500
    console.error(error);
    return { error: "Erro no servidor" }
  }
}
