import React from 'react';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AddressForm from '../forms/AddressForm';
import ValidTimeInput from '../inputs/ValidTimeInput';

const CompleteTaskForm = ({ task, setFlashMessages }) => {
  let statusOK;

  const history = useHistory();
  const [isReady, setIsReady] = useState(false);
  const [address, setAddress] = useState({"apt": "", "city": "New York", "state": "NY"});

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
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');
    fetch(process.env.REACT_APP_SERVER + `/task/${task.type}/complete`, {
      method: 'POST',
      body: JSON.stringify({ hubbubId, hubbubToken, address, task }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        history.push('/tasks');
        setFlashMessages(data.flashes);
      } else {
        setFlashMessages(data.flashes);
      }

    });
    window.scrollTo(0, 0);
  }

  return (
    <div className="card-body">
      <div className="row my-0">
        <p className="card-text fw-bolder">Has this {task.type === 'dropoff' ? 'Dropoff' : 'Pickup'} task been completed?</p>
        <div className="col-12">
          <form onSubmit={submit} >
            <AddressForm address={address} setAddress={setAddress} required={true} />
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
                type="submit"
                id="button-addon2"
                disabled={!isReady}
              >
                Complete Task
              </button>
            </div>
            <p className="card-text my-1 fst-italic"><small>Type '<span className="text-hubbub">I have completed this task.</span>' in the field to Complete Task.</small></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompleteTaskForm;
