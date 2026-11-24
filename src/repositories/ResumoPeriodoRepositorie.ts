import { prisma } from "../libs/prismaInstance";

type Resumo = {
  receita: number;
  custo: number;
  totalVendas: number;
  unidadesVendidas: number;
};

export default async function ResumoPeriodoRepositorie(
  dataInicio?: string,
  dataFim?: string
) {
  let resumo: Resumo[];

  if (dataInicio && dataFim) {
    resumo = await prisma.$queryRaw<Resumo[]>`
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
    resumo = await prisma.$queryRaw<Resumo[]>`
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
}