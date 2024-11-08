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


interface CriaEventoDialogProps {
    showDeleteModal: boolean;
    setShowDeleteModal: (value: boolean) => void;
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ApagaEventoDialog({
    showDeleteModal,
    setShowDeleteModal,
    handleDelete,
    }: CriaEventoDialogProps) {

  return (
    <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent className="sm:max-w-md sm:justify-center">
                    <DialogHeader>
                    <DialogTitle className='text-center'>Apagar evento</DialogTitle>
                    <DialogDescription className='text-center'>
                        você tem certeza que quer apagar esse evento?
                    </DialogDescription>
                    </DialogHeader>            
                    <DialogFooter className="sm:justify-center">

                            <Button type="button" variant="destructive" onClick={handleDelete}>
                                Apagar
                            </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancelar
                        </Button>
                    </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
  );
}
