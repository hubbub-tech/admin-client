import React from 'react';

const FormErrors = ({errors, color}) => {
  if (color === null) {
    color = 'red';
  }
  if (errors) {
    return (
      <div>
      {errors.map((error, index) => (
        <p key={index} style={{"color": color}} className="mt-2 mb-0">{error}</p>
      ))}
      </div>
    );
  } else {
    return null;
  }
}

export default FormErrors;
