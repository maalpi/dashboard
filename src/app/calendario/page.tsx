'use client'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import brLocale from '@fullcalendar/core/locales/pt-br';
import { useState } from 'react';

interface Event {
    title: string;
    start: Date | string;
    allDay: boolean;
    id: number;
}

export default function Calendario() {
    const [events, setEvents] = useState([
        {title: 'event 1', id: '1'},
        {title: 'event 2', id: '2'},
        {title: 'event 3', id: '3'},
        {title: 'event 4', id: '4'},
    ])

    const [allEvents, setAllEvents] = useState<Event[]>([])
    const [showModal,setShowModal] = useState(false)
    const [showDeleteModal,setShowDeleteModal] = useState(false)
    const [idToDelete, setIdToDelete] = useState<number | null>(null)
    const [newEvent, setNewEvent] = useState<Event>({
        title: '',
        start: '',
        allDay: false,
        id:0
    })

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-16">
            <div className='grid grid-cols-8'>
                <div className='col-span-6'>
                    <FullCalendar locale={brLocale}
                                plugins={[ 
                                    dayGridPlugin,            
                                    interactionPlugin,
                                    timeGridPlugin
                                    ]}
                                headerToolbar = {{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'resourceTimelineWook, dayGridMonth, timeGridWeek'
                                }} 
                                events = {allEvents}
                                nowIndicator={true}
                                editable={true}
                                droppable={true}
                                selectable={true}
                                selectMirror={true}
                                //   dateClick={{}}
                                //   drop={}
                                //   eventClick={}
                    />
                    </div>
                    <div id='draggable-el' className='ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-200'>
                        <h1 className='font-bold text-lg text-center'>Drag event</h1>
                        {events.map(e => (
                            <div key={e.title} 
                                 className='fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white text-violet-700'
                                 title={e.title}>
                                    {e.title}
                            </div>
                        ))}
                </div>
            </div>
        </main>
    )
}