import React, { useState } from 'react';

import './modal.scss';

const Modal = ({ handleModalClose, postNewEvent }) => {
  const [date, setDate] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [title, setTitle] = useState('');

  const eventObj = Object.assign({}, date, timeFrom, timeTo, title);

  const handleSubmitEvent = (event) => {
    const { date, timeFrom, timeTo, title } = eventObj;

    const df = new Date(date);
    const dateFrom = new Date(
      df.setHours(timeFrom.slice(0, 2), timeFrom.slice(3, 5), 0)
    ).getTime();

    const dt = new Date(date);
    const dateTo = new Date(
      dt.setHours(timeTo.slice(0, 2), timeTo.slice(3, 5), 0)
    ).getTime();

    event.preventDefault();
    postNewEvent({ dateFrom, dateTo, title });

    handleModalClose();
  };

  return (
    <div className='modal overlay'>
      <div className='modal__content'>
        <div className='create-event'>
          <button
            className='create-event__close-btn'
            onClick={handleModalClose}
          >
            +
          </button>
          <form className='event-form' onSubmit={handleSubmitEvent}>
            <input
              type='text'
              name='title'
              placeholder='Title'
              className='event-form__field'
              value={Object.values(title)}
              onChange={(e) => {
                const { name, value } = e.target;
                setTitle({ [name]: value });
              }}
            />
            <div className='event-form__time'>
              <input
                type='date'
                name='date'
                className='event-form__field'
                value={Object.values(date)}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setDate({ [name]: value });
                }}
              />
              <input
                type='time'
                name='timeFrom'
                className='event-form__field'
                value={Object.values(timeFrom)}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setTimeFrom({ [name]: value });
                }}
              />
              <span>-</span>
              <input
                type='time'
                name='timeTo'
                className='event-form__field'
                value={Object.values(timeTo)}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setTimeTo({ [name]: value });
                }}
              />
            </div>
            <textarea
              name='description'
              placeholder='Description'
              className='event-form__field'
            ></textarea>
            <button type='submit' className='event-form__submit-btn'>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
