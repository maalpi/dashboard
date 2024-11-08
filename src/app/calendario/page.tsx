'use client'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import brLocale from '@fullcalendar/core/locales/pt-br';
import { useEffect, useState } from 'react';
import { EventSourceInput } from '@fullcalendar/core/index.js'
 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

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
        {title: 'event 5', id: '5'},
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

    useEffect(() => {
        let draggableEl = document.getElementById('draggable-el');

        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: '.fc-event',
                eventData: function (eventEl) {
                    let title = eventEl.getAttribute('title')
                    let id = eventEl.getAttribute('data')
                    let start = eventEl.getAttribute('start')
                    return {title, id, start}
                }
            })
        }
    }, [])

    function handleDelete() {
        setAllEvents(allEvents.filter(event => Number(event.id) !== Number(idToDelete)))
        setShowDeleteModal(false)
        setIdToDelete(null)
      }

    function handleDateClick(arg: {date: Date, allDay: boolean}) {
        setNewEvent({
            ...newEvent,
            start: arg.date,
            allDay: arg.allDay,
            id: new Date().getTime()
        })
        setShowModal(true);
    }

    function addEvent(data: DropArg) {
        const event = { 
            ...newEvent, 
            start: data.date.toISOString(), 
            title: data.draggedEl.innerText, 
            allDay: data.allDay, 
            id: new Date().getTime() 
        }
        setAllEvents([...allEvents, event])
    }

    function handleDeleteModal(data: {event: {id:string}}) {
        setShowDeleteModal(true);
        setIdToDelete(Number(data.event.id));
    }

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewEvent({
          ...newEvent,
          title: e.target.value
        })
    }
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setAllEvents([...allEvents, newEvent])
        setShowModal(false)
        setNewEvent({
          title: '',
          start: '',
          allDay: false,
          id: 0
        })
    }


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
                                    left: 'prev,next',
                                    center: 'title',
                                    right: 'today'
                                }} 
                                events = {allEvents as EventSourceInput}
                                nowIndicator={true}
                                editable={true}
                                droppable={true}
                                selectable={true}
                                selectMirror={true}
                                dateClick={handleDateClick}
                                drop={(data) => addEvent(data)}
                                eventClick={(data) => handleDeleteModal(data)}
                    />
                    </div>
                    <div id='draggable-el' className='ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-200'>
                        <h1 className='font-bold text-lg text-center'>Drag event</h1>
                        {events.map(e => (
                            <div key={e.id} 
                                 className='fc-event border-2 p-1 m-2 w-full cursor-grab rounded-md ml-auto text-center bg-white text-violet-700'
                                 title={e.title}>
                                    {e.title}
                            </div>
                        ))}
                </div>
            </div>

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
        </main>
    )
}