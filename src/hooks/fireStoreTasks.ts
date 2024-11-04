"use client";

import { db } from "@/db/firebase";
import { Id } from "@/interfaces/Column";
import { Task } from "@/interfaces/Tasks";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export const FirestoreTasks = () => {
    // Função para adicionar uma nova task como parte do array de tasks do documento `kanbanTables/{tableId}`
    async function createTaskFirestore(newTask: Task, tableId: string) {
        try {
            const tableRef = doc(db, `kanbanTables/${tableId}`);
            const tableSnap = await getDoc(tableRef);

            const currentTasks = tableSnap.exists() ? tableSnap.data().tasks || [] : [];
            currentTasks.push({ ...newTask, id: newTask.id || Date.now().toString() });

            await updateDoc(tableRef, { tasks: currentTasks });
            console.log("Task adicionada:", newTask);
            return newTask;
        } catch (e) {
            console.error("Erro ao adicionar task: ", e);
        }
    }

    // Função para deletar uma task do array de tasks no documento `kanbanTables/{tableId}`
    async function deleteTaskFirestore(taskId: Id, tableId: string) {
        try {
            const tableRef = doc(db, `kanbanTables/${tableId}`);
            const tableSnap = await getDoc(tableRef);

            let currentTasks = tableSnap.exists() ? tableSnap.data().tasks || [] : [];
            currentTasks = currentTasks.filter((task: Task) => task.id !== taskId);

            await updateDoc(tableRef, { tasks: currentTasks });
            console.log("Task deletada com ID:", taskId);
        } catch (e) {
            console.error("Erro ao deletar task: ", e);
        }
    }

    // Função para atualizar uma task dentro do array de tasks do documento `kanbanTables/{tableId}`
    async function updateTaskFirestore(taskId: Id, updatedTask: Partial<Task>, tableId: string) {
        try {
            const tableRef = doc(db, `kanbanTables/${tableId}`);
            const tableSnap = await getDoc(tableRef);

            let currentTasks = tableSnap.exists() ? tableSnap.data().tasks || [] : [];
            currentTasks = currentTasks.map((task: Task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
            );

            await updateDoc(tableRef, { tasks: currentTasks });
            console.log("Task atualizada com ID:", taskId);
        } catch (e) {
            console.error("Erro ao atualizar task: ", e);
        }
    }

    return { createTaskFirestore, deleteTaskFirestore, updateTaskFirestore };
};
