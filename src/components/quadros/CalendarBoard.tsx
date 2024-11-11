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
import { CriaEventoDialog } from '@/components/dialog/criaEventoCalendarioDialog';
import { ApagaEventoDialog } from '@/components/dialog/apagaEventoCalendarioDialogo';


interface Event {
    title: string;
    start: Date | string;
    allDay: boolean;
    id: string;
}

export default function CalendarBoard() {
    const events = [
        { title: 'event 1', id: '1' },
        { title: 'event 2', id: '2' },
        { title: 'event 3', id: '3' },
        { title: 'event 4', id: '4' },
        { title: 'event 5', id: '5' },
    ];

    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    const [newEvent, setNewEvent] = useState<Event>({
        title: '',
        start: '',
        allDay: false,
        id: '0',
    });

    // Função para carregar os eventos do Firestore ao iniciar o componente
    useEffect(() => {
        const loadEvents = async () => {
            const querySnapshot = await getDocs(collection(db, 'events'));
            const loadedEvents = querySnapshot.docs.map((doc) => {
                const data = doc.data() as DocumentData;
    
                // Certifique-se de que os dados tenham todos os campos necessários
                return {
                    id: doc.id || 0,
                    title: data.title || '',
                    start: data.start ? data.start.toDate() : '',
                    allDay: data.allDay || false,
                } as Event;
            });
            
            console.log(loadedEvents)
            setAllEvents(loadedEvents);
        };
    
        loadEvents();
    }, []);

    // Função para salvar um evento no Firestore
    const saveEvent = async (event: Event) => {
        await addDoc(collection(db, 'events'), event);
    };

    useEffect(() => {
        let draggableEl = document.getElementById('draggable-el');

        if (draggableEl) {
            console.log('draggable ativado');
            new Draggable(draggableEl, {
                itemSelector: '.fc-event',
                eventData: function (eventEl) {
                    let title = eventEl.getAttribute('title');
                    let id = eventEl.getAttribute('data');
                    let start = eventEl.getAttribute('start');
                    return { title, id, start };
                },
            });
        }
    }, []);

    const handleDelete = async () => {
        if (idToDelete !== null) {
            console.log("Tentando deletar o evento com ID:", idToDelete);
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

    const handleDateClick = (arg: { date: Date; allDay: boolean }) => {
        setNewEvent({
            ...newEvent,
            start: arg.date,
            allDay: arg.allDay,
            id: new Date().getTime().toString(),
        });
        setShowModal(true);
    };

    const addEvent = (data: DropArg) => {
        const event = {
            ...newEvent,
            start: data.date.toISOString(),
            title: data.draggedEl.innerText,
            allDay: data.allDay,
            id: new Date().getTime().toString(),
        };
        console.log('salvando:',event.start )
        setAllEvents([...allEvents, event]);
        saveEvent(event); // Salva o novo evento no Firestore
    };

    const handleDeleteModal = (data: { event: { id: string } }) => {
        console.log(data.event.id);
        console.log(data.event);

        setShowDeleteModal(true);
        setIdToDelete(data.event.id);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewEvent({
            ...newEvent,
            title: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAllEvents([...allEvents, newEvent]);
        saveEvent(newEvent); // Salva o evento criado no Firestore
        setShowModal(false);
        setNewEvent({
            title: '',
            start: '',
            allDay: false,
            id: '0',
        });
    };

    const updateEvent = async (eventId: string, updatedData: Partial<Event>) => {
        const eventRef = doc(db, 'events', eventId);
        await updateDoc(eventRef, updatedData);
    };

    const handleUpdate = async (eventId: string, newStart: string, allDay: boolean) => {
        try {
            // Atualiza o evento no Firestore
            await updateEvent(eventId, { start: newStart, allDay });
    
            // Atualiza o estado local para refletir a mudança
            setAllEvents(allEvents.map(event =>
                event.id === (eventId) ? { ...event, start: newStart, allDay } : event
            ));
        } catch (error) {
            console.error("Erro ao atualizar o evento:", error);
        }
    };

    return (
        <div className="grid grid-cols-8">
            <div className="col-span-6">
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
            <div id="draggable-el" className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-200">
                <h1 className="font-bold text-lg text-center">Drag event</h1>
                {events.map((e) => (
                    <div
                        key={e.id}
                        className="fc-event border-2 p-1 m-2 w-full cursor-grab rounded-md ml-auto text-center bg-white text-violet-700"
                        title={e.title}
                    >
                        {e.title}
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