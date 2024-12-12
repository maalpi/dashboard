'use client'
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CirclePlus, ClipboardList } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { Input } from "@/components/ui/input"

export default function ToDoComponent() {
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const getRandomNumber = () => Math.floor(Math.random() * 9999);

  const addTodo = () => {
    if (newTodo) {
      const randomNumber = getRandomNumber();
      const newItem = {
        id: `item-${randomNumber}`,
        content: newTodo,
      };
      setTodo(todo.concat(newItem));
      setNewTodo('');
    }
  };

  const handleKeyUp = (key) => {
    if (key === 'Enter') addTodo();
  };

  const handleDelete = (id) => {
    setTodo(todo.filter((_, index) => index !== id));
  };

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
          <div className="relative mt-2 flex items-center">
            <CirclePlus
              className="cursor-pointer h-5 w-5 text-muted-foreground mr-2"
              onClick={addTodo}
            />
            <Input
              type="text"
              placeholder="Adicionar à lista..."
              className="w-full appearance-none bg-background shadow-none"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyUp={(e) => handleKeyUp(e.key)}
            />
          </div>
          <div className="overflow-x-auto w-full mt-4">
            <ul className="flex flex-row gap-4 w-max">{/* Itens flexíveis e largura dinâmica */}
              {todo.map((item, index) => (
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
              ))}
            </ul>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
