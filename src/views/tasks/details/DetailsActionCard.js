import { useState, useEffect, useContext } from 'react';

import { TimePreciseInput } from '../../../inputs/time-precise';
import { FlashContext } from '../../../providers/FlashProvider';

import { printDate } from '../../utils.js';

export const DetailsActionCard = ({ taskId, dtDue, timeslots }) => {
  const [timeSched, setTimeSched] = useState(undefined);
  const [isDisabled, setIsDisabled] = useState(true);

  const [taskTimeSubtitle, setTaskTimeSubtitle] = useState("Set a task time");

  const { renderFlash } = useContext(FlashContext);

  const handleTimeScheduled = () => {
    const postData = async(url) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ taskId, dtDue, timeSched }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      renderFlash(data.message, "info", 10000);
      setTaskTimeSubtitle("Your time has been set!");
    }

    postData(process.env.REACT_APP_SERVER + '/task/set-time')
    .catch(console.error);
  }

  useEffect(() => {
    setIsDisabled(timeSched ? false : true);
  }, [timeSched]);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Set Task Time</h5>
        <h6 className="card-subtitle mb-2 text-muted">{taskTimeSubtitle}</h6>
        <p className="card-text">
          Set a time for the delivery/pickup to happen, sending a notice to
          the user of when to expect the Hubbub bud.
        </p>
        <div className="input-group">
          <TimePreciseInput setTimeSched={setTimeSched} timeRanges={timeslots} />
          <button
            type="button"
            onClick={handleTimeScheduled}
            className="btn btn-hubbub"
            disabled={isDisabled}
          >
            Submit Time
          </button>
        </div>
      </div>
    </div>
  );
}
