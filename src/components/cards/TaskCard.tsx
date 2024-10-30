import { Task } from "@/interfaces/Tasks";
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Id } from "@/interfaces/Column";

interface Props {
    task: Task;
    deleteTask: (id:Id) => void;
}

export default function TaskCard({task, deleteTask}: Props){
    const [mouseIsOver, setMouseIsOver] = useState(false)
    return (
        <Card>
            <CardContent className="p-2.5 items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
                         onMouseEnter={() => {
                            setMouseIsOver(true);
                         }}

                         onMouseLeave={() => {
                            setMouseIsOver(false);
                         }}
            >
                <p className="p-4">{task.content}</p>
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