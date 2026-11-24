import {FastifyRequest, FastifyReply} from 'fastify'
import EditProductService from '../../services/EditProductService'


export async function EditProductController(request:FastifyRequest, reply: FastifyReply) {
    const Produto = request.body
    const id: any = request.params
    try {
        const response = await EditProductService(Produto, id)
        return response
    } catch (error){
        console.log(error)
        reply.statusCode = 500
        return { error: "Erro no servidor" }
    }
}
