'use client'

import React, { useState } from "react";
import { Column, Id } from "@/interfaces/Column";
import ColumnContainer from "./ColumnContainer";
import { Task } from "@/interfaces/Tasks";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import TaskCard from "../cards/TaskCard";
import {arrayMove} from '@dnd-kit/sortable';

function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([{'id': '1', 'title':'backlog'},{'id': '2', 'title':'progresso'}, {'id': '3', 'title':'concluído'}]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTask, setActiveTask] = useState< Task|null>(null);
    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {
            distance: 3,
        }})
    )

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

    function updateTask(id: Id, content: string) {
        const newTasks = tasks.map(task => {
            if (task.id !== id) return task;
            return {...task, content}
        });
        
        setTasks(newTasks);
    }

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Task'){
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveTask(null);
    
        const { active, over } = event;
        if (!over) return;
    
        const activeId = active.id;
        const overId = over.id;
    
        if (activeId === overId) return;
    
        const isOverAColumn = over.data.current?.type === "Column";
        const isOverATask = over.data.current?.type === "Task";
    
        setTasks((tasks) => {
            const activeTaskIndex = tasks.findIndex((task) => task.id === activeId);
            if (activeTaskIndex === -1) return tasks;
    
            const updatedTasks = [...tasks];
    
            if (isOverAColumn) {
                // Mover tarefa para uma nova coluna
                updatedTasks[activeTaskIndex] = {
                    ...updatedTasks[activeTaskIndex],
                    columnId: overId,
                };
            } else if (isOverATask) {
                const overTaskIndex = tasks.findIndex((task) => task.id === overId);
                if (overTaskIndex === -1) return tasks;
    
                // Mover tarefa para a mesma coluna, atualizando a posição
                updatedTasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId;
                return arrayMove(updatedTasks, activeTaskIndex, overTaskIndex);
            }
    
            return updatedTasks;
        });
    }
    
    function onDragOver(event: DragOverEvent) {
        const {active, over} = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === 'Task';
        const isOverATask = over.data.current?.type === 'Task';

        if (!isActiveATask) return;

        if(isActiveATask && isOverATask) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId)
                const overIndex = tasks.findIndex(t => t.id === overId);
                
                tasks[activeIndex].columnId = tasks[overIndex].columnId;
                
                return arrayMove(tasks, activeIndex, overIndex);
            })
        }

        const isOverAColumn = over.data.current?.type === 'Column';

        if (isActiveATask && isOverAColumn) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId)
                
                tasks[activeIndex].columnId = overId;
                
                return arrayMove(tasks, activeIndex, activeIndex);
            })
        }
    }
    return (
        <div className="m-auto flex min-h-[700px] w-full items-center justify-center overflow-x-auto overflow-y-hidden px-[40px]">
            <DndContext onDragStart={onDragStart} sensors={sensors} onDragEnd={onDragEnd} onDragOver={onDragOver}>
                <div className="m-auto flex gap-4">
                    <div className="flex gap-4">
                        {columns.map((col) => (
                            <ColumnContainer 
                                key={col.id}
                                column={col}
                                deleteColumn={deleteColumn}
                                createTask={createTask}
                                tasks={tasks.filter(task => task.columnId === col.id)}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                            />
                        ))}
                    </div>
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeTask && (
                            <TaskCard 
                                task={activeTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                            />
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
}

export default KanbanBoard;