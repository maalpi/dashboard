import * as React from "react"
 
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import {Trash2 } from "lucide-react"

interface NoteProps {
    title: string;
    content: string;
    onDelete: (id: number) => void;
    id: number;
}

export function Nota({ title, content, onDelete, id }: NoteProps) {
  return (
    <Card className="w-[240px] mt-5 shadow-md float-left">
      <CardContent className="m-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="mt-2 text-wrap md:text-balance">{content}</CardDescription>
        <Button onClick={() => onDelete(id)}>
            <Trash2 size={15} className=''/>
        </Button>
      </CardContent>
    </Card>
  )
}