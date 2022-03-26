import React from 'react'
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Navbar } from '../ui/Navbar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { messages } from '../../helpers/calendar-messages-es';


moment.locale('es');

const localizer = momentLocalizer(moment);
const events = [
    {
        title: 'Birthday',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
    },
];

export const CalendarScreen = () => {
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
        }
    };

    return (
        <div className='calendar-screen'>
            <Navbar />
            <h1>CalendarScreen</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor='start'
                endAccessor='end'
                messages={messages}
                eventPropGetter={eventStyleGetter}
            />
        </div>
    );
};