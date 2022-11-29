export const FeedFilterOptions = ({ setFilterBy }) => {

  const handleFilterBy = (e) => setFilterBy(e.target.value);

  return (
    <div className="col-md-6 me-auto">
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          onChange={handleFilterBy}
          type="radio"
          name="inlineRadioOptions"
          id="dropoffTasks"
          value="dropoffs"
        />
        <label className="form-check-label" htmlFor="dropoffTasks">Dropoffs (only)</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          onChange={handleFilterBy}
          type="radio"
          name="inlineRadioOptions"
          id="pickupTasks"
          value="pickups"
        />
        <label className="form-check-label" htmlFor="pickupTasks">Pickups (only)</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          onChange={handleFilterBy}
          type="radio"
          name="inlineRadioOptions"
          id="allTasks"
          value="all"
        />
        <label className="form-check-label" htmlFor="allTasks">All</label>
      </div>
    </div>
  );
}
