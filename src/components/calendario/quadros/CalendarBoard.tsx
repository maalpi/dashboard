// CalendarBoard.tsx
'use client'

import { useEffect, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import brLocale from '@fullcalendar/core/locales/pt-br';

import { db } from '@/db/firebase';
import { collection, addDoc, getDocs, DocumentData, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { EventSourceInput } from '@fullcalendar/core';
import { CriaEventoDialog } from '@/components/calendario/dialog/criaEventoCalendarioDialog';
import { ApagaEventoDialog } from '@/components/calendario/dialog/apagaEventoCalendarioDialogo';


interface Event {
    title: string;
    start: Date | string;
    allDay: boolean;
    id: string;
}

export default function CalendarBoard() {
    // estados
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    const [newEvent, setNewEvent] = useState<Event>({ title: '', start: '', allDay: false, id: '0' });

    // carregando ao inicializar componente
    useEffect(() => {
        loadEvents();
    }, []);

    // garantindo que o draggable só seja configurado uma vez
    useEffect(() => {
        const draggableEl = document.getElementById('draggable-el');
        if (draggableEl && !draggableEl.classList.contains('draggable-initialized')) {
          new Draggable(draggableEl, {
            itemSelector: '.fc-event',
            eventData: (eventEl) => ({
              title: eventEl.getAttribute('title') || '',
              id: eventEl.getAttribute('data') || '',
            }),
          });
          draggableEl.classList.add('draggable-initialized');
        }
      }, []);


    /*  Função para salvar um evento no Firestore; Carregar 
        os eventos nas paginas sempre que tiver alguma mudança
        no banco de dados; Função para adicionar o evento puxado
        da lista fixa e função para update do evento.
    */
    const saveEvent = async (event: Event) => {
        await addDoc(collection(db, 'events'), event);
        
    };

    const loadEvents = async () => {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const loadedEvents = querySnapshot.docs.map((doc) => {
                const data = doc.data() as DocumentData;
                return {
                    id: doc.id || 0,
                    title: data.title || '',
                    start: data.start ? data.start.toDate() : '',
                    allDay: data.allDay || false,
                } as Event;
            });
            setAllEvents(loadedEvents);
    };

    const addEvent = async (data: DropArg) => {
        try {
            const event = {
                ...newEvent,
                start: new Date(data.date),
                title: data.draggedEl.innerText,
                allDay: data.allDay,
                id: new Date().getTime().toString(),
            };

            await saveEvent(event); // Salva no Firestore
            loadEvents();
        } catch (error) {
            console.error("Erro ao salvar o evento:", error);
        }
    };

    const updateEvent = async (eventId: string, updatedData: Partial<Event>) => {
        const eventRef = doc(db, 'events', eventId);
        await updateDoc(eventRef, updatedData);
    };

    // Handlers de Evento
    const handleDelete = async () => {
        if (idToDelete !== null) {
            try {
                await deleteDoc(doc(db, 'events', idToDelete));
                setAllEvents(allEvents.filter((event) => event.id !== idToDelete));
                setShowDeleteModal(false);
                setIdToDelete(null);
            } catch (error) {
                console.error("Erro ao deletar o evento do Firestore:", error);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewEvent({
            ...newEvent,
            title: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const eventToSave = { ...newEvent };
    
        try {
            await saveEvent(eventToSave); // Salva o evento no Firestore
            await loadEvents(); // Recarrega todos os eventos
        } catch (error) {
            console.error("Erro ao salvar o evento:", error);
        }
    
        setShowModal(false);
        setNewEvent({
            title: '',
            start: '',
            allDay: false,
            id: '0',
        });
    };

    const handleUpdate = async (eventId: string, newStart: string, allDay: boolean) => {
        try {

            const isoStart = new Date(newStart);
            // Atualiza o evento no Firestore
            await updateEvent(eventId, { start: isoStart, allDay });

            // Atualiza o estado local para refletir a mudança
            setAllEvents(allEvents.map(event =>
                event.id === (eventId) ? { ...event, start: isoStart, allDay } : event
            ));
        } catch (error) {
            console.error("Erro ao atualizar o evento:", error);
        }
    };

    // Modal Handlers
    const handleDateClick = (arg: { date: Date; allDay: boolean }) => {
        setNewEvent({
            ...newEvent,
            start: arg.date,
            allDay: arg.allDay,
            id: new Date().getTime().toString(),
        });
        setShowModal(true);
    };

    const handleDeleteModal = (data: { event: { id: string } }) => {
        setShowDeleteModal(true);
        setIdToDelete(data.event.id);
    };

    return (
        <div className="sm:grid sm:grid-cols-8">
            <div className="col-span-1 sm:col-span-7 xl:col-span-6">
                <FullCalendar
                    locale={brLocale}
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    headerToolbar={{
                        left: 'prev,next',
                        center: 'title',
                        right: 'today',
                    }}
                    events={allEvents as EventSourceInput}
                    nowIndicator={true}
                    editable={true}
                    droppable={true}
                    selectable={true}
                    selectMirror={true}
                    eventDrop={(info) => {
                        const { id, start, allDay } = info.event;
                        handleUpdate(id, start ? start.toISOString() : '', allDay || false);
                    }}
                    dateClick={handleDateClick}
                    drop={addEvent}
                    eventClick={handleDeleteModal}
                />
            </div>
             <div
                id="draggable-el"
                className="ml-8 hidden sm:block border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-200"
            >
                <h1 className="font-bold text-lg text-center">Drag event</h1>
                {['sair', 'aula', 'correr', 'estudar', 'academia'].map((title, id) => (
                <div
                    key={id}
                    className="fc-event border-2 p-1 m-2 rounded-md cursor-grab text-center bg-white text-violet-700"
                    title={title}
                >
                    {title}
                </div>
                ))}
            </div>

            <ApagaEventoDialog
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDelete={handleDelete}
            />

            <CriaEventoDialog
                showModal={showModal}
                setShowModal={setShowModal}
                newEvent={newEvent}
                handleChange={handleChange} 
                handleSubmit={handleSubmit}
            />
        </div>
    );
}