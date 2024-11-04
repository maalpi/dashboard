'use client'

import KanbanBoard from "@/components/quadros/KanbanBoard";
import { useEffect, useState } from "react";
import { db } from "@/db/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
export default function DynamicTable ({ params, }: {params: {tabelaId: string}} ){
  const [documentId, setDocumentId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDocumentId() {
      // Consulta para encontrar o documento com o campo `name` correspondente
      const tablesCollection = collection(db, "kanbanTables");
      const q = query(tablesCollection, where("name", "==", params.tabelaId.replace(/%20/g, " ")));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setDocumentId(doc.id); // Define o ID do documento
      } else {
        console.error("Tabela não encontrada");
      }
    }

    fetchDocumentId();
  }, [params.tabelaId]);

  return (
    <main className="sm:ml-14 p-8">
      <div className="flex">
        <h1 className="text-2xl mb-4 font-semibold">Tabela {params.tabelaId.replace(/%20/g, " ")}</h1>
      </div>

      <KanbanBoard tabelaId={documentId}/>
    </main>
  )
}
