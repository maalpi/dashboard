'use client'

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { useState } from 'react';
import { Button } from "../ui/button";

 
export function CardNotas({ onAdd }) {

  const [isExpanded, setExpanded] = useState(false);

  const [nota, setNota] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
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


  function submitButton(event){
    onAdd(nota);
    event.preventDefault();
  }

  return (
    <Card className="md:w-[600px] w-[350px] shadow-md">
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