'use client'
import { useEffect, useState } from "react";
import { KanbanDialog } from "@/components/dialog/kanbanDialog";
import { db } from "@/db/firebase"; // Importar o db do seu Firebase
import { collection, getDocs } from "firebase/firestore";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [kanbanTables, setKanbanTables] = useState([]); // Estado para armazenar as tabelas

  // Função para buscar os dados do Firestore
  const fetchKanbanTables = async () => {
    const querySnapshot = await getDocs(collection(db, "kanbanTables"));
    const tables = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setKanbanTables(tables);
  };

  useEffect(() => {
    fetchKanbanTables(); // Chama a função ao montar o componente
  }, []);

  return (
    <main className="sm:ml-14 p-4">
      <div className="flex">
        <h1 className="text-2xl mb-4 font-semibold">Kanban</h1>
        <KanbanDialog />
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        {kanbanTables.map((table) => (
        <Card 
            key={table.id} 
            className="w-[200px] p-4 border rounded-md cursor-pointer hover:bg-gray-200 transition-all hover:text-black" 
            onClick={() => console.log(`Clicou na tabela: ${table.name}`)}
        > 
            <CardTitle className="transition-all">{table.name}</CardTitle>
            <CardDescription className="mt-3">{table.imageUrl}</CardDescription> {/* Exibir a descrição ou a URL da imagem */}
          </Card>
        ))}
      </section>
    </main>
  );
}
