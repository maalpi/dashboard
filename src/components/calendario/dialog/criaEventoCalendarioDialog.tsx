'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { Input } from "../../ui/input";

interface CriaEventoDialogProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    newEvent: { title: string; start: string | Date; allDay: boolean; id: string };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function CriaEventoDialog({
    showModal,
    setShowModal,
    newEvent,
    handleChange,
    handleSubmit
    }: CriaEventoDialogProps) {

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="sm:max-w-md sm:justify-center">
                <DialogHeader>
                    <DialogTitle className='text-center'>Add Event</DialogTitle>
                    <DialogDescription className='text-center'>
                        adicionar um novo evento?
                    </DialogDescription>
                    <form action="submit" onSubmit={handleSubmit}>
                        <Input id="title" name="title"  value={newEvent.title} onChange={(e) => handleChange(e)} placeholder="title" />
                        <button
                            type="submit"
                            className="inline-flex w-full mt-1 justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                            disabled={newEvent.title === ''}
                        >
                            Create
                        </button>
                    </form>
                </DialogHeader>            
                <DialogFooter className="sm:justify-center">
                    <DialogClose asChild>
                        <Button type="button"  variant="secondary">
                            Cancelar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
    </Dialog>
  );
}
