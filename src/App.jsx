import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const baseUrl = 'https://60d49bf961160900173cbb6b.mockapi.io/api/v1/calendar';
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const updateEvents = () => {
    fetch(baseUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Internal Server Error. Can't display events");
      })
      .then((json) =>
        json.map((event) => {
          setEvents((result) => [...result, event]);
        })
      );
  };

  const deleteEvent = (id) => {
    fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    }).then(() => updateEvents());
  };

  const postNewEvent = ({ dateFrom, dateTo, title }) => {
    const eventToPost = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      title: title,
    };

    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(eventToPost),
    }).then(() => updateEvents());
  };

  useEffect(() => {
    updateEvents();
  }, []);

  const getNextWeek = () => {
    setWeekStartDate(
      new Date(
        weekStartDate.getFullYear(),
        weekStartDate.getMonth(),
        weekStartDate.getDate() + 7
      )
    );
  };

  const getPreviousWeek = () => {
    setWeekStartDate(
      new Date(
        weekStartDate.getFullYear(),
        weekStartDate.getMonth(),
        weekStartDate.getDate() - 7
      )
    );
  };

  const getCurrentWeek = () => {
    setWeekStartDate(new Date());
  };

  return (
    <>
      <Header
        getNextWeek={getNextWeek}
        getPreviousWeek={getPreviousWeek}
        getCurrentWeek={getCurrentWeek}
        postNewEvent={postNewEvent}
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        deleteEvent={deleteEvent}
      />
    </>
  );
};

export default App;
