import { useState, useEffect } from 'react';

import plusSvg from '../assets/plus.svg';


export const TimePreciseInput = ({ setTimeSched, timeRanges }) => {

  const defaultTimeSched = "--:--";
  const [selectedTimeSched, setSelectedTimeSched] = useState(defaultTimeSched);

  const [menuLabel, setMenuLabel] = useState("Select a time");

  const [timeRangeOptions, setTimeRangeOptions] = useState([defaultTimeSched]);

  useEffect(() => {
    let requestedTimeRangeOptions = [];
    for (let i = 0; i < timeRanges.length; ++i) {
      let requestedRange = timeRanges[i];
      let dtStart = new Date(requestedRange.dt_range_start * 1000);
      let dtEnd = new Date(requestedRange.dt_range_end * 1000);

      let hoursStart = `${dtStart.getHours()}`;
      let hoursEnd = `${dtEnd.getHours()}`;

      let minStart = dtStart.getMinutes() <= 9 ? `0${dtStart.getMinutes()}` : `${dtStart.getMinutes()}`;
      let minEnd = dtEnd.getMinutes() <= 9 ? `0${dtEnd.getMinutes()}` : `${dtEnd.getMinutes()}`;

      let start = `${hoursStart}:${minStart}`;
      let end = `${hoursEnd}:${minEnd}`;

      requestedTimeRangeOptions.push([start, end]);
    }

    setTimeRangeOptions(requestedTimeRangeOptions);
  }, [timeRanges]);

  const handleSelectTimeSched = (e) => {

    const newTimeSched = e.target.value;
    setSelectedTimeSched(newTimeSched);
    setTimeSched(newTimeSched);

    console.log(newTimeSched)
    setMenuLabel(e.target.value);
  };

  return (
    <input
      type="time"
      id="timeSched"
      min="07:00"
      max="18:00"
      className="form-control"
      aria-label="Enter chosen time"
      aria-describedby="timeSchedButton"
      onChange={handleSelectTimeSched}
      required={true}
    />
  );
}
