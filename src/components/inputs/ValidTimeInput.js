import moment from 'moment';
import React from 'react';
import { useState, useEffect } from 'react';

import FormErrors from '../errors/FormErrors';
import { toMilitaryTime } from '../../utils.js';

const ValidTimeInput = ({
  onSubmit,
  chosenTime,
  setChosenTime,
  validTimeslots
}) => {
  const parsedTimeslots = []
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    for (let i = 0; i < validTimeslots.length; i++) {
      let militaryTime = toMilitaryTime(validTimeslots[i]);
      parsedTimeslots.push(militaryTime);
    }
    //console.log({"military" : parsedTimeslots})
  }, [validTimeslots, chosenTime])

  const onTimeChange = (e) => {
    let checkTime = moment(e.target.value, 'HH:mm').format('h:mm:ss A');
    for (let i = 0; i < parsedTimeslots.length; i++) {
      if (checkTime > parsedTimeslots[i][0]) {
        if (checkTime < parsedTimeslots[i][1]) {
          setErrors([]);
          setIsValid(true);
          setChosenTime(checkTime);
          return;
        }
      }
    }
    setIsValid(false);
    setChosenTime(checkTime);
    setErrors(["The chosen time must fall within the availabilities provided by the user."]);
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
            disabled={!isValid}
          >
            Button
          </button>
        </div>
      </div>
      <FormErrors errors={errors} color={"red"} />
    </div>
  );
}

export default ValidTimeInput;
