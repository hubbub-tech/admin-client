import React from 'react';

const FilterInput = ({ options, list, setList }) => {
  return (
    <div className="input-group mb-3">
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon1"
      >
        Button
      </button>
      <select className="form-select" aria-label="Default select example">
        <option selected>Open this select menu</option>
        {options.map((option) => (
          <option
            key={option.attribute}
            value={option.attribute}
          >
            {option.visible}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterInput;
