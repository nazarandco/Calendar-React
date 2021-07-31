import React, { useState } from 'react';

import './event.scss';

const Event = ({ height, marginTop, title, time, deleteEvent, id }) => {
  const [isDeleteWindow, setDeleteWindow] = useState(false);
  const [isDeleteEvent, setDeleteEvent] = useState(false);

  const toggle = () => {
    setDeleteWindow(!isDeleteWindow);
  };

  const handleDelete = () => {
    setDeleteEvent(true);
  };

  const eventStyle = {
    height,
    marginTop,
  };

  return !isDeleteEvent ? (
    <div style={eventStyle} className='event' onClick={toggle}>
      <div className='event__title'>{title}</div>
      <div className='event__time'>{time}</div>
      {isDeleteWindow && (
        <div
          className='delete-event-btn'
          onClick={(event) => {
            event.stopPropagation();
            deleteEvent(id);
            handleDelete();
          }}
        >
          <span className='delete-event-btn__text'>Delete 🗑</span>
        </div>
      )}
    </div>
  ) : null;
};

export default Event;
