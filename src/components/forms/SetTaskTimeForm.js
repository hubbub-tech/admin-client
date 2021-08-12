import React from 'react';
import { useState, useEffect } from 'react';

import ValidTimeInput from '../inputs/ValidTimeInput';

const SetTaskTimeForm = ({ task, setFlashMessages }) => {
  let statusOK;
  const [chosenTime, setChosenTime] = useState(null);
  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }
  const submit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_SERVER + '/task/chosen-time', {
      method: 'POST',
      body: JSON.stringify({ task, chosenTime }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => setFlashMessages(data.flashes));
    window.scrollTo(0, 0);
  }

  return (
    <div className="card-body">
      <div className="row my-0">
        <p className="card-text fw-bolder">Choose a {task.type === 'dropoff' ? 'Dropoff' : 'Pickup'} Time</p>
        <div className="col-sm-5">
          <ValidTimeInput
            onSubmit={submit}
            chosenTime={chosenTime}
            setChosenTime={setChosenTime}
            validTimeslots={task.logistics.timeslots}
          />
        </div>
        <div className="col-sm-7">
          <p className="card-text">
            <span>User availabilities: </span>
            {task.logistics.timeslots.map((timeslot) => (
              <span key={timeslot} className="badge bg-warning mx-1"> {timeslot} </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SetTaskTimeForm;
