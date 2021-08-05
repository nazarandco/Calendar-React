import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import {
  getWeekStartDate,
  generateWeekRange,
  getNextWeek,
  getPreviousWeek,
} from '../src/utils/dateUtils.js';
import {
  updateEvents,
  deleteEvent,
  postNewEvent,
} from '../src/gateway/gateways.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const updateEventsApp = () =>
    updateEvents().then((json) =>
      json.map((event) => {
        setEvents((result) => [...result, event]);
      })
    );

  const pageUpdater = () => {
    setEvents([]);
    updateEventsApp();
  };

  const deleteEventFromApp = (id) => {
    setEvents(events.filter((event) => event.id !== id));
    deleteEvent(id).then(() => pageUpdater());
  };

  const postNewEventInApp = ({ dateFrom, dateTo, title }) => {
    const eventToPost = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      title: title,
    };
    const getDateFunc = (date) => new Date(new Date(date).toString()).getDay();
    const getHoursFunc = (date) =>
      new Date(new Date(date).toString()).getHours();
    const getMinutesFunc = (date) =>
      new Date(new Date(date).toString()).getMinutes();

    const timeValidation = () => {
      const result = events.find(
        (event) =>
          getDateFunc(event.dateFrom) === getDateFunc(dateFrom) &&
          ((event.dateFrom < dateFrom && event.dateTo > dateFrom) ||
            (event.dateFrom < dateTo && event.dateTo > dateTo) ||
            (dateFrom < event.dateFrom &&
              dateTo > event.dateFrom &&
              dateTo > event.dateTo))
      );

      if (result) {
        return true;
      }
      return false;
    };

    const hoursValidation = (dateTo - dateFrom) / 1000 / 60 / 60;

    const dayValidation = () => {
      const dateToDay = dateTo / 1000 / 60 / 60;
      const dateFromDay = dateFrom / 1000 / 60 / 60;

      if (dateToDay < dateFromDay) {
        return true;
      }
      return false;
    };

    const midnightValidation =
      getHoursFunc(dateFrom) === 0 && getMinutesFunc(dateFrom) === 0;

    if (timeValidation()) {
      alert(`Sorry, we can't shedule two events in one time!`);
    } else if (hoursValidation > 6) {
      alert(`Sorry, event's longer than 6 hours are not allowed!`);
    } else if (dayValidation()) {
      alert(`Sorry, each event should starts and ends in one day!`);
    } else if (midnightValidation) {
      alert(`Let's start at 00:15!`);
    } else {
      postNewEvent(eventToPost).then(() => pageUpdater());
    }
  };

  useEffect(() => pageUpdater(), []);

  const getNextWeekInApp = () => {
    setWeekStartDate(getNextWeek(weekStartDate));
  };

  const getPreviousWeekInApp = () => {
    setWeekStartDate(getPreviousWeek(weekStartDate));
  };

  const getCurrentWeekInApp = () => {
    setWeekStartDate(new Date());
    updateEventsApp();
  };

  return (
    <>
      <Header
        getNextWeek={getNextWeekInApp}
        getPreviousWeek={getPreviousWeekInApp}
        getCurrentWeek={getCurrentWeekInApp}
        postNewEvent={postNewEventInApp}
        weekStartDate={weekStartDate}
        updateEventsApp={updateEventsApp}
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        deleteEvent={deleteEventFromApp}
        postNewEvent={postNewEventInApp}
        updateEventsApp={updateEventsApp}
      />
    </>
  );
};

export default App;
