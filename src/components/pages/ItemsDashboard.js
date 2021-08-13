import React from 'react';
import { useState, useEffect } from 'react';

import ItemsTable from '../tables/ItemsTable';

const ItemsDashboard = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + '/items')
    .then(res => res.json())
    .then(data => setItems(data.items));
  }, []);
  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
          </div>
          <div className="col-sm-1"></div>
        </div>
        <div className="row">
          <div className="col">
            <ItemsTable items={items} setItems={setItems} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ItemsDashboard;
