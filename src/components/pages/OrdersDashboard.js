import React from 'react';
import { useState, useEffect } from 'react';

import OrdersTable from '../tables/OrdersTable';

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + '/orders')
    .then(res => res.json())
    .then(data => setOrders(data.orders));
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
            <OrdersTable orders={orders} setOrders={setOrders} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrdersDashboard;
