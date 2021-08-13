import React from 'react';
import { useHistory } from 'react-router-dom';

import { sortList } from '../../utils.js';

const ItemsTable = ({ items, setItems }) => {
  const history = useHistory();
  const handleOnClick = (itemId) => {
    history.push(`/items/history/id=${itemId}`);
  }

  const sortItems = (key) => {
    const sortedItems = sortList(items, key);
    setItems(sortedItems);
  }
  return (
    <table className="table table-hover table-responsive">
      <thead>
        <tr>
          <th scope="col-1" id="head-id" onClick={() => sortItems("id")}>Id</th>
          <th scope="col-2" id="head-name" onClick={() => sortItems("name")}>Item</th>
          <th scope="col-2" id="head-lister_id" onClick={() => sortItems("lister_id")}>Lister</th>
          <th scope="col-2" id="head-date_started">Start Listing</th>
          <th scope="col-2" id="head-date_ended">End Listing</th>
          <th scope="col-1" id="head-is_featured" onClick={() => sortItems("is_featured")}>Is Featured</th>
          <th scope="col-1" id="head-is_available" onClick={() => sortItems("is_available")}>Is Available</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} onClick={() => handleOnClick(item.id)}>
            <th scope="row">{ item.id }</th>
            <td>
              {item.name === item.name.substring(0, 30)
                ? item.name
                : item.name.substring(0, 30) + '...'
              }
            </td>
            <td>{ item.lister.name }</td>
            <td>{ item.calendar.date_started }</td>
            <td>{ item.calendar.date_ended }</td>
              <td>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={item.is_featured}
                  disabled={true}
                 />
              </td>
              <td>
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={item.is_available}
                  disabled={true}
                />
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ItemsTable;
