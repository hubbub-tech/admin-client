import React from 'react';
import { useState } from 'react';

import ValidTimeInput from '../inputs/ValidTimeInput';

const ConfirmDropoffForm = ({ order, setFlashMessages }) => {
  let statusOK;
  const [isValid, setIsValid] = useState(false);
  const [chosenTime, setChosenTime] = useState(null);
  const [timeslots, setTimeslots] = useState(order.dropoff.logistics.timeslots);

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }
  const submit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_SERVER + `/order/dropoff/confirm/id=${order.id}`, {
      method: 'POST',
      body: JSON.stringify({ chosenTime }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => setFlashMessages(data.flashes));
    window.scrollTo(0, 0);
  }
  return (
    <form onSubmit={submit}>
      <ValidTimeInput validTimeslots={timeslots} />
      {/**/}
      <div className="d-grid gap-2">
        <input
          className="btn btn-hubbub"
          type='submit'
          value='Confirm Dropoff Time'
          disabled={Object.keys(order.dropoff.logistics).length === 0}
        />
      </div>
    </form>
  );
}

export default ConfirmDropoffForm;
