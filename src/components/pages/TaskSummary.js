import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import TaskCard from '../cards/TaskCard';

const TaskSummary = ({ flashMessages, setFlashMessages }) => {
  let statusOK;
  let statusCode;

  const { taskType, orderId } = useParams();
  const [task, setTask] = useState({
    "type": null,
    "task_date": null,
    "is_complete": null,
    "address": {
      // "num": null,
      // "street": null,
      // "city": null,
      // "state": null,
      // "zip_code": null,
      // "apt": null
    },
    "logistics": {
      "timeslots": []
    },
    "renter": {
      "profile": {}
    },
    "orders": []
  });

  const history = useHistory();
  const isStatusOK = (res) => {
    statusOK = res.ok;
    statusCode = res.status;
    return res.json();
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + `/task/${taskType}/id=${orderId}`, {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setTask(data.task);
      } else if (statusCode === 403) {
        setFlashMessages(data.flashes);
        history.push('/logout');
      } else if (statusCode === 404) {
        setFlashMessages(data.flashes);
        history.push('/404');
      }
    });
  }, [orderId, flashMessages]);
  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <div className="row">
              <h1>Task Portal</h1>
              <p>Specialized management for tasks with all the details you need.</p>
              <p>Chose a time for dropoff/pickup. Then when the task is complete, confirm here.</p>
              <hr />
            </div>
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-sm-10">
                <TaskCard
                  key={`${task.type}-${task.task_date}-${task.renter.id}`}
                  setFlashMessages={setFlashMessages}
                  task={task}
                />
              </div>
              <div className="col-sm-1"></div>
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </main>
  );
}

export default TaskSummary;
