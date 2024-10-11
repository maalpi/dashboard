import { db } from "@/db/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Função de handler para a rota API
export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();

    // Adicionando documento na coleção 'kanbanTables'
    const docRef = await addDoc(collection(db, 'kanbanTables'), {
      name,
      imageUrl,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 200 });
  } catch (error) {
    console.error('Erro ao salvar tabela:', error);
    return NextResponse.json({ error: 'Erro ao salvar tabela' }, { status: 500 });
  }
}
