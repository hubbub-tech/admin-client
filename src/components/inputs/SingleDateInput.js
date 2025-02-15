import React from 'react';
import { useState, useEffect } from 'react';

import { stringToMoment } from '../../utils.js';
import FormErrors from '../errors/FormErrors';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const SingleDateInput = ({
  selectedDay,
  handleOnChange,
  setIsValid,
  minDateString,
  maxDateString,
  disabledDays,
}) => {
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState();
  const minMoment = stringToMoment(minDateString);
  const maxMoment = stringToMoment(maxDateString);

  useEffect(() => {
    if (!selectedDay) {
      setIsValid(false);
    } else if (selectedDay <= minMoment.toDate()) {
      setErrors([`No dates before ${minMoment.format('LL')} are valid.`]);
      setIsValid(false);
    } else if (minMoment.isSame(selectedDay, 'day')) {
      setErrors([`No dates before ${minMoment.format('LL')} are valid.`]);
      setIsValid(false);
    } else if (selectedDay >= maxMoment.toDate()) {
      setErrors([`No dates after ${maxMoment.format('LL')} are valid.`]);
      setIsValid(false);
    } else if (maxMoment.isSame(selectedDay, 'day')) {
      setErrors([`No dates after ${maxMoment.format('LL')} are valid.`]);
      setIsValid(false);
    } else {
      setErrors([]);
      setIsValid(true);
    }
  }, [selectedDay]);
  return (
    <div className="row my-3">
      <DayPicker
        onDayClick={handleOnChange}
        selectedDays={selectedDay}
        disabledDays={disabled}
      />
      <FormErrors errors={errors} color={"red"} />
    </div>
  );
}

export default SingleDateInput;
