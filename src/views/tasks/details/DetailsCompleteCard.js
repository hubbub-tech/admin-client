import { useState, useEffect, useContext } from 'react';

import { printDate } from '../../utils.js';

export const DetailsCompleteCard = ({ taskId, dtDue, timeslots }) => {

  const [taskTimeSubtitle, setTaskTimeSubtitle] = useState("Done!");

  useEffect(() => {
    setIsDisabled(timeSched ? false : true);
  }, [timeSched]);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Event Completed</h5>
        <h6 className="card-subtitle mb-2 text-muted">{taskTimeSubtitle}</h6>
        <p className="card-text">
          Thanks for completing this order.
        </p>
      </div>
    </div>
  );
}
