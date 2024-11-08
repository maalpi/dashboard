// CalendarBoard.tsx
'use client'

import { useEffect, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import brLocale from '@fullcalendar/core/locales/pt-br';

import { db } from '@/db/firebase';
import { collection, addDoc, getDocs, DocumentData, deleteDoc, doc } from 'firebase/firestore';

import { EventSourceInput } from '@fullcalendar/core';
import { CriaEventoDialog } from '@/components/dialog/criaEventoCalendarioDialog';
import { ApagaEventoDialog } from '@/components/dialog/apagaEventoCalendarioDialogo';


interface Event {
    title: string;
    start: Date | string;
    allDay: boolean;
    id: number;
}

export default function CalendarBoard() {
    const [events, setEvents] = useState([
        { title: 'event 1', id: '1' },
        { title: 'event 2', id: '2' },
        { title: 'event 3', id: '3' },
        { title: 'event 4', id: '4' },
        { title: 'event 5', id: '5' },
    ]);

    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);
    const [newEvent, setNewEvent] = useState<Event>({
        title: '',
        start: '',
        allDay: false,
        id: 0,
    });

    // Função para carregar os eventos do Firestore ao iniciar o componente
    useEffect(() => {
        const loadEvents = async () => {
            const querySnapshot = await getDocs(collection(db, 'events'));
            const loadedEvents = querySnapshot.docs.map((doc) => {
                const data = doc.data() as DocumentData;
    
                // Certifique-se de que os dados tenham todos os campos necessários
                return {
                    id: doc.id,
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
        if (idToDelete) {
            try {
                // Deletar o evento do Firestore usando o ID
                await deleteDoc(doc(db, 'events', String(idToDelete)));
                
                // Remover o evento da lista local
                setAllEvents(allEvents.filter((event) => event.id !== String(idToDelete)));
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
            id: new Date().getTime(),
        });
        setShowModal(true);
    };

    const addEvent = (data: DropArg) => {
        const event = {
            ...newEvent,
            start: data.date.toISOString(),
            title: data.draggedEl.innerText,
            allDay: data.allDay,
            id: new Date().getTime(),
        };
        setAllEvents([...allEvents, event]);
        saveEvent(event); // Salva o novo evento no Firestore
    };

    const handleDeleteModal = (data: { event: { id: string } }) => {
        setShowDeleteModal(true);
        setIdToDelete(Number(data.event.id));
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
            id: 0,
        });
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