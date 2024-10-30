import { Column, Id } from "@/interfaces/Column"
import { Task } from "@/interfaces/Tasks";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import TaskCard from "../cards/TaskCard";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;

    createTask: (columnId: Id) => void;
    tasks: Task[];

    deleteTask: (id: Id) => void;
}

function ColumnContainer(props: Props){
    const { column, deleteColumn, createTask, tasks, deleteTask } = props;

    return (
        <div className="w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
            <div className="text-md h-[60px] bg-current cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 border-current" 
            >
                <div className="flex items-center justify-between px-2 py-1 text-sm">
                    <div/>
                    <h1 className="text-primary-foreground">{column.title}</h1>
                    <button className="text-primary-foreground hover:text-red-500"
                            onClick={() => {deleteColumn(column.id);}}    
                    >
                        <Trash2Icon className="w-4 h-4" />
                    </button>
                </div>
            </div>
            {/*TASKS*/}
            <div className='flex flex-grow bg-current flex-col gap-4 p-2 overflow-auto'>
                {
                tasks.map( task => (
                    <TaskCard key={task.id} 
                              task={task} 
                              deleteTask={deleteTask}
                    />
                ))
                }
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