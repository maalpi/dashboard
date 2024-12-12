import { Task } from "@/interfaces/Tasks";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Textarea } from "../../ui/textarea";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Id } from "@/interfaces/Column";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

export default function TaskCard({ task, deleteTask, updateTask }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [localContent, setLocalContent] = useState(task.content); 

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseIsOver(false);
    };

    if (isDragging) {
        return (
            <Card ref={setNodeRef}
                style={style}
                className="opacity-50"
            >
                <CardContent className="p-2.5 h-[80px] min-h-[80px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset
                                          hover:ring-rose-500 cursor-grab relative task opacity-50">
                </CardContent>
            </Card>
        );
    }

    if (editMode) {
        return (
            <Card>
                <CardContent
                    ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    className="p-2.5 items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative">
                    <Textarea 
                        value={localContent} // Usando o estado local
                        autoFocus
                        placeholder="coloque o nome da task"
                        onBlur={() => {
                            updateTask(task.id, localContent); // Atualiza Firestore ao sair do campo
                            toggleEditMode(); // Alterna o modo de edição
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                updateTask(task.id, localContent); // Atualiza Firestore
                                toggleEditMode(); // Alterna o modo de edição
                            }
                        }}
                        onChange={e => setLocalContent(e.target.value)} // Atualiza o estado local
                    />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card onClick={toggleEditMode}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <CardContent className="p-2.5 h-[80px] min-h-[80px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset
                                  hover:ring-inherit cursor-grab relative task "
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
                        <Trash2Icon className="w-5 h-5" />
                    </button>
                }
            </CardContent>
        </Card>
    );
}
