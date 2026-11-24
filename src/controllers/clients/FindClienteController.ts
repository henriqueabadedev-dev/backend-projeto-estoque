import {FastifyRequest, FastifyReply} from 'fastify'
import FindProduct from '../../repositories/findProduct'
import FindClient from '../../repositories/findClientRepositorie'

export async function FindClienteController(request:FastifyRequest, reply: FastifyReply) {
    const params: any = request.params
    const query: any = request.query

    try {
        const response = await FindClient(params, query)
        return response
    } catch (error){
        console.log(error)
        reply.statusCode = 500
        return { error: "Erro no servidor" }
    }
}
