'use client'

import { CardNotas } from "@/components/cards/createNotasCard";
import { Nota } from "@/components/cards/notesCard";
import { useEffect, useState } from "react";

import { db } from "@/db/firebase"; // Importar o db do seu Firebase
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";

interface Note {
    id?: string;
    title: string;
    content: string;
}

export default function Notas() {
    const [notes, setNotes] = useState<Note[]>([])
    
    // Função para buscar os dados do Firestore
    const fetchNoteTable = async () => {
        const querySnapshot = await getDocs(collection(db, "notes"));
        const tables = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        })) as Note[];
        setNotes(tables);
    };

    useEffect(() => {
        fetchNoteTable(); // Chama a função ao montar o componente
    }, []);

    // salvando as notas criadas no Firestore
    const saveNota = async (nota: Note) => {
        try {
            const docRef = await addDoc(collection(db, "notes"), nota);
            const newNoteWithId = { ...nota, id: docRef.id };
            setNotes((prevNotes) => [...prevNotes, newNoteWithId]);
        } catch(e) {
            console.log(e);
        }
    };
    
    function addNote(newNote: Note) {
        saveNota(newNote);
    }

    async function deleteNotes(id: string) {
        try {
            // Deleta a nota do Firestore
            console.log(id)
            await deleteDoc(doc(db, "notes", id));
            // Remove a nota do estado local
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
          } catch (error) {
            console.error("Erro ao deletar a nota:", error);
          }
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-16">
            <CardNotas onAdd={addNote} />
            <div className="grid grid-cols-1 xl:grid-cols-6 md:grid-cols-3 gap-4 mt-8 auto-rows-min">
                {notes.map((note, index) => (
                    <Nota key={index} 
                          id={note.id!} 
                          title={note.title} 
                          content={note.content}
                          onDelete={deleteNotes}
                    />
                ))}
            </div>
        </main>
    );
}