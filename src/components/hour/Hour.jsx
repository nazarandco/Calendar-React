import React, { useState, useEffect } from 'react';

import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({ dataHour, hourEvents, dataDay, deleteEvent }) => {
  const [currentTimeLine, setCurrentTimeLine] = useState(null);

  const nowDay = new Date();
  const currentHour = new Date().getHours();
  const currentMin = new Date().getMinutes();
  const styles = {
    marginTop: currentMin,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeLine(new Date());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='calendar__time-slot' data-time={dataHour + 1}>
      {dataDay === nowDay.getDate() &&
      dataHour === currentHour &&
      new Date().getMinutes() ? (
        <div style={styles} className='red-line'>
          <div className='red-line__circle'></div>
        </div>
      ) : null}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${new Date(dateFrom).getHours()}:${formatMins(
          new Date(dateFrom).getMinutes()
        )}`;
        const eventEnd = `${new Date(dateTo).getHours()}:${formatMins(
          new Date(dateTo).getMinutes()
        )}`;

        return (
          <Event
            key={id}
            id={id}
            height={(dateTo - dateFrom) / (1000 * 60)}
            marginTop={new Date(dateFrom).getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </div>
  );
};

export default Hour;
