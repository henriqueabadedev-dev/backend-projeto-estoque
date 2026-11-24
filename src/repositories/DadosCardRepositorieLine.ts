import { prisma } from "../libs/prismaInstance";

// ---------------------------------------------------------------------------
// Série do gráfico de linha (export default, igual ao que o service já usa)
// ---------------------------------------------------------------------------
export default async function DadosCardRepositorieLine(
  dataInicio?: string,
  dataFim?: string
): Promise<any> {
  try {
    let DadosLine;

    if (dataInicio && dataFim) {
      DadosLine = await prisma.$queryRaw<{ total: number; data: string }[]>`
        with mt as (
          select
            total,
            to_char(
              (("data" at time zone 'UTC') at time zone 'America/Sao_Paulo')::date,
              'YYYY-MM-DD'
            ) as dia
          from "Sales"
          where (("data" at time zone 'UTC') at time zone 'America/Sao_Paulo')::date
                between ${dataInicio}::date and ${dataFim}::date
        )
        select sum(total) as total, dia as data
        from mt
        group by dia
        order by dia asc;
      `;
    } else {
      DadosLine = await prisma.$queryRaw<{ total: number; data: string }[]>`
        with mt as (
          select
            total,
            to_char(
              (("data" at time zone 'UTC') at time zone 'America/Sao_Paulo')::date,
              'YYYY-MM-DD'
            ) as dia
          from "Sales"
        )
        select sum(total) as total, dia as data
        from mt
        group by dia
        order by dia asc;
      `;
    }

    return DadosLine;
  } catch (erro) {
    console.error("Erro ao buscar dados do gráfico:", erro);
    throw erro;
  }
}

// ---------------------------------------------------------------------------
// Resumo do período: receita, custo, lucro, nº de vendas e unidades vendidas
// Usa o MESMO filtro de dia local da query acima, então os números fecham
// com o gráfico de linha (receita = soma dos pontos do gráfico).
// Valores em centavos, igual ao resto da API; o front divide por 100.
// ---------------------------------------------------------------------------
type ResumoRow = {
  receita: number;
  custo: number;
  totalVendas: number;
  unidadesVendidas: number;
};

export async function ResumoPeriodoRepositorie(
  dataInicio?: string,
  dataFim?: string
) {
  try {
    let resumo: ResumoRow[];

    if (dataInicio && dataFim) {
      resumo = await prisma.$queryRaw<ResumoRow[]>`
        with vendas as (
          select id, total
          from "Sales"
          where (("data" at time zone 'UTC') at time zone 'America/Sao_Paulo')::date
                between ${dataInicio}::date and ${dataFim}::date
        ),
        itens as (
          select sp.quantity, sp.quantity::bigint * p.preco as custo
          from "SalesProduct" sp
          join vendas v on v.id = sp."salesId"
          join "Product" p on p.id = sp."productId"
        )
        select
          (select coalesce(sum(total), 0) from vendas)::float8   as receita,
          (select count(*) from vendas)::int                     as "totalVendas",
          (select coalesce(sum(quantity), 0) from itens)::int    as "unidadesVendidas",
          (select coalesce(sum(custo), 0) from itens)::float8    as custo
      `;
    } else {
      resumo = await prisma.$queryRaw<ResumoRow[]>`
        with vendas as (
          select id, total from "Sales"
        ),
        itens as (
          select sp.quantity, sp.quantity::bigint * p.preco as custo
          from "SalesProduct" sp
          join vendas v on v.id = sp."salesId"
          join "Product" p on p.id = sp."productId"
        )
        select
          (select coalesce(sum(total), 0) from vendas)::float8   as receita,
          (select count(*) from vendas)::int                     as "totalVendas",
          (select coalesce(sum(quantity), 0) from itens)::int    as "unidadesVendidas",
          (select coalesce(sum(custo), 0) from itens)::float8    as custo
      `;
    }

    const r = resumo[0];
    return { ...r, lucro: r.receita - r.custo };
  } catch (erro) {
    console.error("Erro ao buscar resumo do período:", erro);
    throw erro;
  }
}