'use client'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import brLocale from '@fullcalendar/core/locales/pt-br';

export default function Calendario() {
    return (
        <main className="sm:ml-14 p-16 min-h-screen flex flex-col items-center justify-between">
            <div className='grid grid-cols-12'>
                <div className='col-span-full'>
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
                                events = {{}}
                                nowIndicator={true}
                                editable={true}
                                droppable={true}
                                selectable={true}
                                selectMirror={true}
                                //   dateClick={{}}
                                //   drop={}
                                //   eventClick={}
                    />
                    <div id='draggable-el' className='ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-200'>
                        <h1 className='font-bold text-lg text-center'>Drag event</h1>
                        {events.map((e => (
                            <div className='fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white'>
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        </main>
    )
}