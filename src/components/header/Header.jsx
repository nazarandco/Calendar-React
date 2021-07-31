import React, { useState } from 'react';
import Modal from '../modal/Modal.jsx';

import { months, getMonth } from '../../utils/dateUtils.js';

import './header.scss';

const Header = ({
  postNewEvent,
  getCurrentWeek,
  getPreviousWeek,
  getNextWeek,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <header className='header'>
      <button
        className='create-event-btn button'
        onClick={() => setModalOpen(true)}
      >
        <i className='fas fa-plus create-event-btn__icon'></i>
        <span className='create-event-btn__text'>Create</span>
      </button>
      {isModalOpen && (
        <Modal
          handleModalClose={() => setModalOpen(false)}
          postNewEvent={postNewEvent}
        />
      )}
      <div className='navigation'>
        <button
          className='navigation__today-btn button'
          onClick={getCurrentWeek}
        >
          Today
        </button>
        <button
          className='icon-button navigation__nav-icon'
          onClick={getPreviousWeek}
        >
          <i className='fas fa-chevron-left'></i>
        </button>
        <button
          className='icon-button navigation__nav-icon'
          onClick={getNextWeek}
        >
          <i className='fas fa-chevron-right'></i>
        </button>
        <span className='navigation__displayed-month'>{getMonth(months)}</span>
      </div>
    </header>
  );
};

export default Header;
