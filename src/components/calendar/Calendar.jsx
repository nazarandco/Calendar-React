import React from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import './calendar.scss';

const Calendar = ({ events, weekDates, deleteEvent }) => {
  const getTimezone = () => {
    const offset = new Date().getTimezoneOffset();

    if (offset < 0) {
      if (-offset % 60 < 10) return `GMT+0${Math.ceil(offset / -60)}`;
    } else {
      if (offset % 60 < 10) return `GMT-0${Math.ceil(offset / 60)}`;
    }
  };

  return (
    <section className='calendar'>
      <Navigation weekDates={weekDates} />
      <div className='calendar__offset'>
        <span className='calendar__offset-text'>{getTimezone()}</span>
        <div className='calendar__offset-line'></div>
      </div>
      <div className='calendar__body'>
        <div className='calendar__week-container'>
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            deleteEvent={deleteEvent}
          />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
