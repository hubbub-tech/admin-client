import React from 'react';
import { useState } from 'react';

import ValidTimeInput from '../inputs/ValidTimeInput';

const CompleteTaskForm = ({ task, setFlashMessages }) => {
  let statusOK;
  const [isReady, setIsReady] = useState(false);
  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }
  const onConfirmation = (e) => {
    if (e.target.value === 'I have completed this task.') {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }

  const submit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_SERVER + `/task/${task.type}/complete`, {
      method: 'POST',
      body: JSON.stringify({ task }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => setFlashMessages(data.flashes));
    window.scrollTo(0, 0);
  }

  return (
    <div className="card-body">
      <div className="row my-0">
        <p className="card-text fw-bolder">Has this {task.type === 'dropoff' ? 'Dropoff' : 'Pickup'} task been completed?</p>
        <div className="col-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="I have completed this task."
              aria-label="I have completed this task."
              aria-describedby="confirmation"
              onChange={onConfirmation}
            />
            <button
              className="btn btn-outline-success"
              onClick={submit}
              type="button"
              id="button-addon2"
              disabled={!isReady}
            >
              Complete Task
            </button>
          </div>
          <p className="card-text my-1 fst-italic"><small>Type '<span className="text-hubbub">I have completed this task.</span>' in the field to Complete Task.</small></p>
        </div>
      </div>
    </div>
  );
}

export default CompleteTaskForm;
