import { useState, useEffect } from 'react';

export const FeedShowExpiredButton = ({ showExpired, setShowExpired }) => {

  const [btnLabel, setBtnLabel] = useState("Loading...");
  const [btnClassName, setBtnClassName] = useState("btn btn-primary");

  useEffect(() => {
    (showExpired)
      ? setBtnLabel("Hide expired tasks...")
      : setBtnLabel("See expired tasks...");

    (showExpired)
      ? setBtnClassName("btn btn-secondary")
      : setBtnClassName("btn btn-primary");
  }, [showExpired]);

  const handleShowExpiredToggle = () => setShowExpired(!showExpired);
  return (
    <button
      className={btnClassName}
      onClick={handleShowExpiredToggle}
      type="button"
    >
       {btnLabel}
    </button>
  );
}
