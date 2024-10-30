'use client'

import React, { useState } from "react";
import { Column, Id } from "@/interfaces/Column";
import ColumnContainer from "./ColumnContainer";
import { Task } from "@/interfaces/Tasks";

function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([{'id': '1', 'title':'backlog'},{'id': '2', 'title':'progresso'}, {'id': '3', 'title':'concluído'}]);
    const [tasks, setTasks] = useState<Task[]>([]);

    console.log(columns)

    function generateId(){
        return Math.floor(Math.random() * 10001)
    }

    function deleteColumn(id: Id) {
        const filteredColumns = columns.filter((col) => col.id !== id);
        setColumns(filteredColumns);
    }

    function createTask(columnId: Id) {
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`
        };

        setTasks([...tasks, newTask]);
    }

    function deleteTask(id: Id) {
        const filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks);
    }
    
    return (
        <div className="m-auto flex min-h-[700px] w-full items-center justify-center overflow-x-auto overflow-y-hidden px-[40px]">
            <div className="m-auto flex gap-4">
                <div className="flex gap-4">
                    {
                        columns.map((col) => (
                           <ColumnContainer key={col.id} 
                                            column={col} 
                                            deleteColumn={deleteColumn} 
                                            createTask={createTask}
                                            tasks={tasks.filter(task => task.columnId === col.id)}
                                            deleteTask={deleteTask}
                        />
                        ))              
                    }
                </div>
                
            </div>
        </div>
    )

}

export default KanbanBoard