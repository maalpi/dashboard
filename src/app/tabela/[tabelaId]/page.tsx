'use client'

export default function DynamicTable ({ params, }: {params: {tabelaId: string}} ){
  return (
    <main className="sm:ml-14 p-4">
      <h1>Pagina da tabela: {params.tabelaId.replace(/%20/g, " ")}</h1>
    </main>
  )
}
