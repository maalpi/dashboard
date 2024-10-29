import { Column, Id } from "@/interfaces/Column"
import { Trash2Icon } from "lucide-react";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
}

function ColumnContainer(props: Props){
    const { column, deleteColumn } = props;
    return (
        <div className="w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
            <div className="text-md h-[60px] bg-current cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 border-current">
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
     </div>
    )
}

export default ColumnContainer