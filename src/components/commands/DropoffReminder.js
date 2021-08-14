import React from 'react';
import { useEffect } from 'react';

const DropoffReminder = ({ setFlashMessages }) => {
  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + '/commands/reminder/dropoff')
    .then(res => res.json())
    .then(data => setFlashMessages(data.flashes));
  }, []);
  return (
    <div class="card my-3">
      <div class="card-body">
        <div className="row">
          <h5 className="card-title">Dropoff Reminder Email</h5>
          <div className="col-sm-8">
            <p className="card-text my-1">Send an email to all users who have not completed their dropoff form</p>
          </div>
          <div className="col-sm-4">
            <div className="d-grid gap-2">
              <button
                className="btn btn-success"
                type="button"
              >
                Send Dropoff Email Reminder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropoffReminder;
