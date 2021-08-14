import React from 'react';

import DropoffReminder from '../commands/DropoffReminder';
import PickupReminder from '../commands/PickupReminder';

const CommandPortal = ({ setFlashMessages }) => {
  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <div className="row">
              <h1>Command Portal</h1>
              <p>Bulk comms and actions for users who meet prescribed conditions.</p>
              <hr />
            </div>
            <div className="row">
              <DropoffReminder setFlashMessages={setFlashMessages} />
              <PickupReminder setFlashMessages={setFlashMessages} />
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </main>
  );
}

export default CommandPortal;
