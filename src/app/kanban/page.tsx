'use client'
import { useEffect, useState } from "react";
import { KanbanDialog } from "@/components/dialog/kanbanDialog";
import { db } from "@/db/firebase"; // Importar o db do seu Firebase
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface KanbanTable {
  id: string;
  name: string;
  imageUrl: string;
}

export default function Home() {
  const [kanbanTables, setKanbanTables] = useState<KanbanTable[]>([]); 
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const router = useRouter(); 

  // Função para buscar os dados do Firestore
  const fetchKanbanTables = async () => {
    const querySnapshot = await getDocs(collection(db, "kanbanTables"));
    const tables = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as KanbanTable[];
    setKanbanTables(tables);
  };

  useEffect(() => {
    fetchKanbanTables(); // Chama a função ao montar o componente
  }, []);


  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Tem certeza que deseja deletar este item?");
    if (confirmed) {
      try {
        await deleteDoc(doc(db, "kanbanTables", id));
        setKanbanTables((prevTables) => prevTables.filter((table) => table.id !== id));
      } catch (error) {
        console.error("Erro ao deletar o item:", error);
      }
    }
  };

  const handlePage = (tableName: string) => {
    router.push(`/tabela/${tableName}`);
  };

  return (
    <main className="sm:ml-14 p-4 ">
      <div className="flex">
        <h1 className="text-2xl mb-4 font-semibold">Kanban</h1>
        <KanbanDialog onKanbanCreated={fetchKanbanTables}/>
      </div>
      <section className="grid grid-cols-2 sm:grid-cols-6 gap-4">
        {kanbanTables.map((table) => (
        <Card 
            key={table.id} 
            className="sm:w-[200px] p-4 border rounded-md cursor-pointer hover:bg-gray-200 transition-all hover:text-black" 
            onClick={() => handlePage(table.name)}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >   
            <div className="break-words flex flex-row">
              <CardTitle className="transition-all w-44">{table.name}</CardTitle>
              {mouseIsOver && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Impede que o clique abra a página
                  handleDelete(table.id);
                }}
                className="float-right ml-4 bg-transparent border-none hover:bg-transparent ease-in"
              >
                <Trash2 size={17} className="text-red-500 hover:text-red-950 ease-in" />
              </button>
            )}
            </div>
            <CardDescription className="mt-3">{table.imageUrl}</CardDescription> {/* Exibir a descrição ou a URL da imagem */}
          </Card>
        ))}
      </section>
    </main>
  );
}
