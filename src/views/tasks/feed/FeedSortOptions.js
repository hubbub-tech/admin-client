import { useEffect } from 'react';

import filterSvg from '../assets/filter.svg';

export const FeedSortOptions = ({ location, setOrderBy, setFilterBy }) => {

  const handleOrderBy = (e) => setOrderBy(e.target.value);
  const handleFilterBy = (e) => setFilterBy(e.target.value);

  return (
    <div className="input-group input-group-reverse my-3">
      <select className="form-select" onChange={handleOrderBy} id="sortOptionsInput">
        <option value="default" defaultValue={true}>Sort Results By...</option>
        {location && <option value="fromProximity">Proximity to Origin</option>}
        {location && <option value="toProximity">Proximity to Destination</option>}
      </select>
      <label className="input-group-text" htmlFor="sortOptionsInput">
        <img src={filterSvg} alt="filter-icon" />
      </label>
    </div>
  );
}
