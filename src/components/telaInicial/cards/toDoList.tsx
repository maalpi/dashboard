'use client'
import React, { useState} from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import { CirclePlus, ClipboardList } from 'lucide-react';
import { Label } from "@/components/ui/label"

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Input } from "@/components/ui/input"

// Default export of the PomodoroComponent function
export default function ToDoComponent() {
    const [todo, setTodo] = useState([])
    const [newTodo, setNewTodo] = useState('')
  
    const getRandomNumber = () => {
      return Math.floor(Math.random() * 9999)
    }
  
    const handleKeyUp = (key) => {
      if (key === 'Enter' && newTodo) {
        const randomNumber = getRandomNumber()
        
        const newItem = {
          id: `item-${randomNumber}`,
          content: newTodo
        }
  
        setTodo(todo.concat(newItem))
  
        setNewTodo('')
      }
    }
  
    const handleDelete = (id) => {
      if (id > -1) {
        setTodo(todo.slice(0, id).concat(todo.slice(id+1)))
      }
    }
  
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return result
    }
  
    const handleOnDragEnd = (result) => {
      const { destination, source } = result
  
      if (!destination) {
        return
      }
  
      const items = reorder(todo, source.index, destination.index)
  
      setTodo(items)
    }
  return (
    <Card className='rounded-lg'>
  <CardHeader>
    <div className='flex items-center justify-center'>
      <CardTitle className='text-lg sm:text-xl text-gray-500 select-none'>To-do List diário</CardTitle>
      <ClipboardList className='ml-auto w-4 h-4' />
    </div>

    <CardDescription>
      {format(new Date(), "dd 'de' MMMM, yyyy", { locale: ptBR })}
    </CardDescription>
    <CardContent>
      <div className="relative mt-2">
        <CirclePlus className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Adicionar à lista..."
          className="w-full appearance-none bg-background pl-8 shadow-none "
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyUp={(e) => handleKeyUp(e.key)}
        />
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="overflow-x-auto w-full" // Container com rolagem horizontal
            >
              <ul className="flex flex-row gap-4 w-max pt-6"> {/* Itens flexíveis e largura dinâmica */}
                {todo?.map((item, index) => {
                  return (
                    <Draggable draggableId={item.id} key={item.id} index={index}>
                      {(draggableProvided) => (
                        <div
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          ref={draggableProvided.innerRef}
                        >
                          <li
                            key={item.id}
                            className="w-64 flex-shrink-0 flex flex-row items-center border-2 rounded-xl mt-2 hover:border-blue-300"
                          >
                            <Input id={index} type="checkbox" className="block w-4 h-4 ml-3" />
                            <Label htmlFor={index} className="block w-full p-3">{item.content}</Label>
                            <button
                              id={index}
                              onClick={() => handleDelete(index)}
                              className="w-4 h-4 m-2.5 rounded-2xl flex items-center bg-red-700 text-gray-200 shadow-md justify-center hover:bg-red-500 hover:scale-105"
                            >
                              <span className="p-1 mb-1">x</span>
                            </button>
                          </li>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </ul>
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </CardContent>
  </CardHeader>
</Card>
  );
}