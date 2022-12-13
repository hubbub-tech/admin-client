import { useState, useEffect } from 'react';

import { FeedCardItem } from './FeedCardItem';
import { FeedTaskDetailsButton } from './FeedTaskDetailsButton';

import { printDate } from '../../utils.js';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const FeedCard = ({ task }) => {

  const [cardHeaderClassName, setHeaderCardClassName] = useState("card-header");
  const [cardHeaderText, setCardHeaderText] = useState("Loading...");

  const [cardBodyTitle, setCardBodyTitle] = useState("Loading...");

  useEffect(() => {
    if (task.dt_received) {
      setCardHeaderText("Completed");
      setHeaderCardClassName("card-header bg-white text-success fw-bold");

      setCardBodyTitle(`Received by ${task.receiver.name} on ${ printDate(task.dt_received) }`)
    } else {
      setCardHeaderText("Incomplete");
      setHeaderCardClassName("card-header bg-danger-light text-white fw-bold");

      setCardBodyTitle(`Due to ${task.receiver.name} on ${ printDate(task.dt_due) }`)
    }
  }, [task]);

  return (
    <div className="col-12 my-2 my-1">
      <div className="card">
        <div className={cardHeaderClassName}>
          {cardHeaderText}
        </div>
        <div className="row card-body">
          <h2 className="card-title fs-6">
          {cardBodyTitle ? cardBodyTitle : <Skeleton />}
          </h2>
          <small className="text-muted mb-3">From: {task.sender.name}</small>
          <div className="d-grid col-lg-9 col-md-8 col-12">
            <table className="table table-borderless table-sm">
              <tr>
                <th scope="row">From</th>
                <td><small>{ task.from_addr_formatted }</small></td>
              </tr>
              <tr>
                <th scope="row">To</th>
                <td><small>{ task.to_addr_formatted }</small></td>
              </tr>
            </table>
            <small className="text-muted mb-2">Notes: { task.notes ? task.notes : 'No notes provided.' }</small>
            <small className="mb-1 fw-bold">Items:</small>
            {task.orders.map((order, index) => (
              <FeedCardItem key={order.id} order={order} />
            ))}
          </div>
          <div className="col-lg-3 col-md-4 col-12">
            <FeedTaskDetailsButton taskId={task.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
