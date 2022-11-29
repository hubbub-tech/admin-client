import { useState, useEffect } from 'react';

import { FeedCardItem } from './FeedCardItem';

export const FeedCard = ({ task }) => {
  return (
    <div className="col-12 my-4">
      <div className="row">
        <div className="d-grid col-lg-10 col-md-8 col-9">
          <h2 className="fs-6 fw-bold">From: { task.from_addr_formatted }</h2>
          <h2 className="fs-6 fw-bold">To: { task.to_addr_formatted }</h2>
          <small className="text-muted mb-2">Notes: { task.notes ? task.notes : 'No notes provided.' }</small>
          <small className="mb-1 fw-bold">Items:</small>
          {task.orders.map((order, index) => (
            <FeedCardItem key={order.id} order={order} />
          ))}
        </div>
        <div className="col-lg-2 col-md-4 col-3">
          <h3 className="me-2 mb-3 fs-6 fw-bold d-flex justify-content-end">Options</h3>
          {/*(dateToday < dtStarted) && <RentalsCancelLogisticsButton logisticsId={dropoff.id} />*/}
        </div>
      </div>
    </div>
  );
}
