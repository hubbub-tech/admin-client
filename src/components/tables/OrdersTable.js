import React from 'react';
import { useHistory } from 'react-router-dom';

import { sortList } from '../../utils.js';

const OrdersTable = ({ orders, setOrders }) => {
  const history = useHistory();
  const handleOnClick = (orderId) => {
    history.push(`/order/summary/id=${orderId}`);
  }

  const sortOrders = (key) => {
    const sortedOrders = sortList(orders, key);
    setOrders(sortedOrders);
  }
  return (
    <table className="table table-hover table-responsive">
      <thead>
        <tr>
          <th scope="col" id="head-id" onClick={() => sortOrders("id")}>Id</th>
          <th scope="col" id="head-renter_id" onClick={() => sortOrders("renter_id")}>Renter</th>
          <th scope="col-1" id="head-item_id" onClick={() => sortOrders("item_id")}>Item</th>
          <th scope="col-2" id="head-res_date_start" onClick={() => sortOrders("res_date_start")}>Start</th>
          <th scope="col-2" id="head-res_date_end" onClick={() => sortOrders("res_date_end")}>End</th>
          <th scope="col-2" id="head-ext_date_end" onClick={() => sortOrders("ext_date_end")}>Extended To</th>
          <th scope="col" id="head-is_dropoff_scheduled" onClick={() => sortOrders("is_dropoff_scheduled")}>Dropoff Scheduled</th>
          <th scope="col" id="head-is_pickup_scheduled" onClick={() => sortOrders("is_pickup_scheduled")}>Pickup Scheduled</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} onClick={() => handleOnClick(order.id)}>
            <th scope="row">{ order.id }</th>
            <td>{ order.renter.name }</td>
            <td>
              {order.item.name === order.item.name.substring(0, 10)
                ? order.item.name
                : order.item.name.substring(0, 20) + '...'
              }
            </td>
            <td>{ order.res_date_start }</td>
            <td>{ order.res_date_end }</td>
            {order.res_date_end !== order.ext_date_end
              ? <td>{ order.ext_date_end }</td>
              : <td>-</td>
            }
            <td>
              <input
                type="checkbox"
                name="isDropoffSched"
                checked={order.is_dropoff_scheduled}
                disabled={true}
               />
            </td>
            <td>
              <input
                type="checkbox"
                name="isPickupSched"
                checked={order.is_pickup_scheduled}
                disabled={true}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrdersTable;
