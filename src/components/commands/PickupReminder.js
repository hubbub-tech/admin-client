import React from 'react';
import { useEffect } from 'react';

const PickupReminder = ({ setFlashMessages }) => {
  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + '/commands/reminder/pickup')
    .then(res => res.json())
    .then(data => setFlashMessages(data.flashes));
  }, []);
  return (
    <div class="card">
      <div class="card-body">
        <div className="row">
          <h5 className="card-title">Pickup Reminder Email</h5>
          <div className="col-sm-8">
            <p className="card-text my-1">Send an email to all users who have not completed their pickup form</p>
          </div>
          <div className="col-sm-4">
            <div className="d-grid gap-2">
              <button
                className="btn btn-success"
                type="button"
              >
                Send Pickup Email Reminder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PickupReminder;
