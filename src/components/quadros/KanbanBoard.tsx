'use client'

import React, { useState } from "react";
import { Button } from "../ui/button";
import { PlusCircleIcon } from "lucide-react";
import { Column, Id } from "@/interfaces/Column";
import ColumnContainer from "./ColumnContainer";

function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([]);
    console.log(columns)

    function generateId(){
        return Math.floor(Math.random() * 10001)
    }
    
    function createNewColumn() {
        const columnParaAdicionar: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`
        };

        setColumns([...columns, columnParaAdicionar]);
    }

    function deleteColumn(id: Id) {
        const filteredColumns = columns.filter((col) => col.id !== id);
        setColumns(filteredColumns);
    }

    return (
        <div className="m-auto flex min-h-[700px] w-full items-center justify-center overflow-x-auto overflow-y-hidden px-[40px]">
            <div className="m-auto flex gap-4">
                <div className="flex gap-4">
                    {
                        columns.map((col) => (
                           <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn}/>
                        ))              
                    }
                </div>
                
                <Button onClick={() => createNewColumn()}><PlusCircleIcon className="w-4 h-4 mr-1"/> <span className="mb-1 font-bold">add column</span> </Button>
            </div>
        </div>
    )

}

export default KanbanBoard