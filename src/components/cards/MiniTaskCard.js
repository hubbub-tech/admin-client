import React from 'react';
import { useState, useEffect } from 'react';

const MiniTaskCard = ({ task, setFlashMessages }) => {
  return (
    <div className="card mx-2 my-3">
      <h5 className="card-header">
        <span>{task.type === 'dropoff' ? 'Dropoff' : 'Pickup'} for {task.task_date}</span>
        {task.logistics.chosen_time && <span className="badge bg-success mx-2">Time Chosen</span>}
      </h5>
      <div className="card-body">
        <h5 className="card-title">
          <span>{task.type === 'dropoff' ? 'Dropoff' : 'Pickup'} Address: </span>
          <span>{task.address.street}, {task.address.city} {task.address.zip_code}</span>
        </h5>
        <div className="row">
          <div className="col-sm-8">
            <h6 className="card-text mt-2">Item(s): </h6>
            <ul className="list-group list-group-flush">
              {task.orders.map((order) => (
                <li className="list-group-item" key={order.id}>
                  #{order.item.id}, <a href={`https://www.hubbub.shop/inventory/i/id=${order.item.id}`}  target="_blank" rel="noreferrer">{order.item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-sm-4"></div>
        </div>
        <p className="card-text">User Notes: {task.logistics.notes}</p>
      </div>
      <hr className="divider" />
      <div className="card-body">
        <div className="d-grid gap-2">
          <a
            href={`/task/${task.type}/id=${task.orders[0].id}`}
            className="btn btn-hubbub"
            type="button"
          >
            More Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default MiniTaskCard;
