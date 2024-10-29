'use client'
import { TaskDialog } from "@/components/dialog/taskDialog";
import KanbanBoard from "@/components/quadros/KanbanBoard";

export default function DynamicTable ({ params, }: {params: {tabelaId: string}} ){
  return (
    <main className="sm:ml-14 p-8">
      <div className="flex">
        <h1 className="text-2xl mb-4 font-semibold">Tabela {params.tabelaId.replace(/%20/g, " ")}</h1>
        <TaskDialog />
      </div>

      <KanbanBoard/>
    </main>
  )
}
