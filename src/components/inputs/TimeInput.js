import moment from 'moment';
import React from 'react';
import { useState, useEffect } from 'react';

import FormErrors from '../errors/FormErrors';
import { toMilitaryTime } from '../../utils.js';

const TimeInput = ({
  onSubmit,
  chosenTime,
  setChosenTime
}) => {
  const [errors, setErrors] = useState([]);

  const onTimeChange = (e) => {
    let checkTime = moment(e.target.value, 'HH:mm').format('h:mm:ss A');
    setChosenTime(checkTime);
  }
  return (
    <div className="row">
      <div className="col-12">
        <div className="input-group mb-3">
          <input
            type="time"
            id="chosenTime"
            name="appt"
            min="07:00"
            max="18:00"
            className="form-control"
            aria-label="Enter chosen time"
            aria-describedby="chosen-time-button"
            onChange={onTimeChange}
            required={true}
          />
          <button
            className="btn btn-outline-success"
            type="button"
            id="chosen-time-button"
            onClick={onSubmit}
          >
            Set Time
          </button>
        </div>
      </div>
      <FormErrors errors={errors} color={"red"} />
    </div>
  );
}

export default TimeInput;
