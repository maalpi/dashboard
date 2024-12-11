'use client';
import { useState } from 'react';
import { saveKanbanTable } from '@/utils/kanbanApi'; // Função para salvar a tabela
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "../../ui/input";


interface KanbanDialogProps {
  onKanbanCreated: () => void; // Recebe a função de callback como prop
}

export function KanbanDialog({ onKanbanCreated }: KanbanDialogProps) {
  const [name, setName] = useState('');        // Nome da tabela
  const [description, setDescription] = useState('');  // Descrição da tabela
  const [uploading, setUploading] = useState(false);   // Estado para indicar o progresso

  const handleCreate = async () => {
    if (!name || !description) {
      alert('Preencha o nome e a descrição da tabela.');
      return;
    }

    try {
      setUploading(true);

      // Salva a tabela no Firestore com a descrição
      const response = await saveKanbanTable(name, description);
      console.log('Tabela criada com ID:', response.id);

      // Reseta os estados
      setName('');
      setDescription('');
      
      onKanbanCreated();
      
    } catch (error) {
      console.error('Erro ao criar tabela:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="ml-auto">Criar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[350px]">
        <AlertDialogHeader>
          <AlertDialogTitle className='text-3xl justify-center'>Criar tabela</AlertDialogTitle>
          <AlertDialogDescription className='flex items-center flex-col'> 
            <div className="grid w-full items-center gap-4">
              {/* Campo de Nome */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input 
                  id="name" 
                  placeholder="Nome da tabela" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* Campo de Descrição */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Descrição</Label>
                <Input 
                  id="description" 
                  placeholder="Descrição da tabela"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleCreate} disabled={uploading}>
            {uploading ? 'Criando...' : 'Criar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
