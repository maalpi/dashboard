'use client'

import { CardNotas } from "@/components/cards/createNotasCard";
import { Nota } from "@/components/cards/notesCard";
import { useState } from "react";

export default function Notas() {
    const [notes, setNotes] = useState([])
    
    function addNote(newNote) {
        setNotes((prevValue) => {
            return [...prevValue, newNote]
        });
    }

    function deleteNotes(id) {
        setNotes((preValue) => {
          return [...preValue.filter((note, index) => index !== id)];
        });
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-16">
            <CardNotas onAdd={addNote} />
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 mt-8">
                {notes.map((notes,index) => (
                    <Nota key={index} 
                        id={index} 
                        title={notes.title} 
                        content={notes.content}
                        onDelete={deleteNotes}
                    />
                ))}
            </div>
        </main>
    );
}
