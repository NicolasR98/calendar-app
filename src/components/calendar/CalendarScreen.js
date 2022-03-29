import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { CalendarModal } from './CalendarModal';

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { messages } from '../../helpers/calendar-messages-es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

import { openModal } from '../../actions/uiActions';
import { eventClearActive, eventSetActive } from '../../actions/calendarActions';
import { AddNewEventFab } from '../ui/AddNewEventFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


moment.locale('es');

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick = (e) => {
        dispatch(openModal());
    };

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    };

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    };

    const onSelectedSlot = () => {
        dispatch(eventClearActive())

    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367CF7',
            color: 'white',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block'
        };

        return {
            style
        };
    };

    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor='start'
                endAccessor='end'
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectedSlot}
                selectable
                view={lastView}
            />
            {
                activeEvent &&
                <DeleteEventFab />
            }
            <AddNewEventFab />
            <CalendarModal />
        </div>
    );
};