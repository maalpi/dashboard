import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";

interface NoteProps {
  title: string;
  content: string;
  onDelete: (id: number) => void;
  id: number;
}

export function Nota({ title, content, onDelete, id }: NoteProps) {
  const [mouseIsOver, setMouseIsOver] = React.useState(false);

  return (
    <Card
      className="w-[240px] mt-5 shadow-md float-left self-start" // adicionando `self-start`
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <CardContent className="p-4">
        <div className="break-words flex flex-row">
          <CardTitle className="w-44">{title}</CardTitle>
          {mouseIsOver && (
            <button
              onClick={() => onDelete(id)}
              className="float-right ml-4 bg-transparent border-none hover:bg-transparent ease-in"
            >
              <Trash2 size={17} className="text-red-500 hover:text-red-950 ease-in" />
            </button>
          )}
        </div>
        <CardDescription className="mt-2 break-words whitespace-pre-wrap">
          {content}
        </CardDescription>
      </CardContent>
    </Card>
  );
}