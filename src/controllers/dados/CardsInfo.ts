import { FastifyReply, FastifyRequest } from "fastify";
import ObterDadosCardsService from "../../services/ObterDadosCardsService";
import ObterDadosCardsServiceLine from "../../services/ObterDadosCardsServiceLine";
import ResumoPeriodoRepositorie from "../../repositories/ResumoPeriodoRepositorie";


export async function ObterDadosCards(
  request: FastifyRequest<{ Querystring: { dataInicio?: string; dataFim?: string } }>,
  reply: FastifyReply
) {
  const { dataInicio, dataFim } = request.query;

  const inicio = dataInicio || "1900-01-01";
  const fim = dataFim || new Date().toISOString().slice(0, 10);

  try {
    const [dados, dadosLine, resumoPeriodo] = await Promise.all([
      ObterDadosCardsService(),
      ObterDadosCardsServiceLine(inicio, fim),
      ResumoPeriodoRepositorie(inicio, fim),
    ]);

    reply.statusCode = 200;
    return { dados, dadosLine, resumoPeriodo };
  } catch (error) {
    reply.statusCode = 500;
    console.error(error);
    return { error: "Erro no back parte de DadosCard" };
  }
}