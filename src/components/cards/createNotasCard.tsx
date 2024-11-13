'use client'

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { useEffect, useRef, useState } from 'react';
import { Button } from "../ui/button";

interface CardNotasProps {
  onAdd: (nota: { title: string; content: string }) => void;
}
 
export function CardNotas({ onAdd }: CardNotasProps) {

  const [isExpanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const [nota, setNota] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = e.target
    setNota(preValue => {
      return {
        ...preValue,
        [name]: value,
      }
    })
  }

  function handleExpanded() {
    setExpanded(true);
  }


  function submitButton(event: React.MouseEvent<HTMLButtonElement>){
    onAdd(nota);
    event.preventDefault();
  }

  return (
    <Card ref={cardRef} className="md:w-[600px] w-[350px] shadow-md" >
      <CardContent className="p-2">
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1">
            {isExpanded && ( 
              <Input id="title" 
                     name="title" 
                     value={nota.title} 
                     onChange={handleChange}
                     placeholder="Titulo" 
                     className="outline-none shadow-none ease-in-out border-none resize-none text-xl placeholder:italic"/>
            )}
              <p>
                <Textarea name='content' 
                          value={nota.content} 
                          onClick={handleExpanded}
                          id='content' 
                          onChange={handleChange}
                          placeholder="escreva a nota..." 
                          rows={isExpanded ? 3 : 1}
                          className="outline-none resize-none shadow-none border-none placeholder:italic"></Textarea>
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={submitButton} className="justify-center bg-yellow-300 -mt-4 shadow-md absolute rounded-full w-12 h-12">Add</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}