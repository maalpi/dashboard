import { Column, Id } from "@/interfaces/Column"
import { Task } from "@/interfaces/Tasks";
import { PlusCircleIcon } from "lucide-react";
import TaskCard from "../cards/TaskCard";
import {useSortable, SortableContext } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo } from "react";


interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;

    createTask: (columnId: Id) => void;
    tasks: Task[];

    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

function ColumnContainer(props: Props){
    const { column, createTask, tasks, deleteTask, updateTask } = props;

    const {
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    const tasksIds = useMemo(() => {
        return tasks.map(task => task.id)
    }, [tasks])

    return (
            <div className="min-w-[270px] h-[500px] xl:h-[500px] sm:w-[1000px] md:min-w-[250px] md:w-[250px] xl:w-[350px] max-h-[600px] rounded-md flex flex-col"
                ref={setNodeRef} 
                style={style} 
                >
                <div className="text-md h-[60px] bg-current rounded-md rounded-b-none p-3 font-bold border-4 border-current" 
                >
                    <div className="flex justify-center py-1 text-sm">

                        <h1 className="text-primary-foreground justify-center">{column.title}</h1>
                        
                    </div>
                </div>
                {/*TASKS*/}
                <div className='flex flex-grow bg-current flex-col gap-4 p-2 overflow-auto'>
                    <SortableContext items={tasksIds}>
                    {
                    tasks.map( task => (
                        <TaskCard key={task.id} 
                                task={task} 
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                        />
                    ))
                    }
                    </SortableContext>
                </div>
                {/*FOOTER*/}
                <button className="flex gap-2 items-center justify-center border-2 p-3 bg-zinc-700 border-t-[0.1px] border-t-slate-300 border-transparent hover:text-rose-500 active:bg-black"
                        onClick={() => {createTask(column.id)}}
                >
                    <PlusCircleIcon/>
                    add taskss
                </button>
        </div>
    )
}

export default ColumnContainer