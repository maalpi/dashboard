import { Task } from "@/interfaces/Tasks";
import {
    Card,
    CardContent,
  } from "@/components/ui/card"

import { Textarea } from "../ui/textarea";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Id } from "@/interfaces/Column";

interface Props {
    task: Task;
    deleteTask: (id:Id) => void;
    updateTask: (id: Id, content: string) => void;
}

export default function TaskCard({task, deleteTask, updateTask}: Props){
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode((prev) => !prev)
        setMouseIsOver(false);
    }

    if (editMode) {
        return (
            <Card >
                <CardContent className="p-2.5 items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative">
                    <Textarea value={task.content} 
                              autoFocus
                              placeholder="coloque o nome da task"
                              onBlur={toggleEditMode}
                              onKeyDown={
                                (e) => {
                                    if (e.key === 'Enter' && e.shiftKey) toggleEditMode();
                                } 
                              }
                              onChange={e => updateTask(task.id, e.target.value)}
                              />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card onClick={toggleEditMode}>
            <CardContent className="p-2.5 h-[80px] min-h-[80px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset
                                  hover:ring-rose-500 cursor-grab relative task "
                         onMouseEnter={() => {
                            setMouseIsOver(true);
                         }}

                         onMouseLeave={() => {
                            setMouseIsOver(false);
                         }}
            >
                <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">{task.content}</p>
                {mouseIsOver &&
                    <button className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 p-2 opacity-50 hover:opacity-100 hover:text-red-500"
                            onClick={() => {
                                deleteTask(task.id);
                            }}
                    >
                        <Trash2Icon className="w-5 h-5"/>
                    </button>
                }
            </CardContent>
        </Card>
    ) 

}