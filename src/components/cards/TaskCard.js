import React from 'react';
import { useState, useEffect } from 'react';

import SetTaskTimeForm from '../forms/SetTaskTimeForm';
import CompleteTaskForm from '../forms/CompleteTaskForm';

const TaskCard = ({ task, setFlashMessages }) => {
  const [changeTime, setChangeTime] = useState(false);
  const toggleChangeTime = (e) => {
    setChangeTime(!changeTime);
  }
  return (
    <div className="card mx-2 my-3">
      <h5 className="card-header">{task.type === 'dropoff' ? 'Dropoff' : 'Pickup'} for {task.task_date}</h5>
      <div className="card-body">
        <h5 className="card-title">Renter Name: {task.renter.name}</h5>
        <h6 className="card-subtitle">
          <span>{task.type === 'dropoff' ? 'Dropoff' : 'Pickup'} Address: </span>
          <span>{task.address.street}, {task.address.city} {task.address.zip_code}</span>
        </h6>
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
        <p className="card-text">Contact Email: {task.renter.email}</p>
        <p className="card-text">Contact Phone: {task.renter.profile.phone}</p>
      </div>
      <hr className="divider" />
      {(!task.logistics.chosen_time || changeTime) &&
        <SetTaskTimeForm task={task} setFlashMessages={setFlashMessages} />
      }
      {(task.logistics.chosen_time && !changeTime) &&
        <CompleteTaskForm task={task} setFlashMessages={setFlashMessages} />
      }
      {task.logistics.chosen_time &&
        <button
          type="button"
          className="btn btn-outline-dark btn-sm"
          onClick={toggleChangeTime}
        >
          {changeTime ? 'Hide Form' : `Change ${task.type == 'dropoff' ? 'Dropoff' : 'Pickup'} Time`}
        </button>
      }
    </div>
  );
}

export default TaskCard;
