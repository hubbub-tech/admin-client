import React from 'react';
import { useState, useEffect } from 'react';

import TaskCard from '../cards/TaskCard';
import TaskFilter from '../filters/TaskFilter';

const TasksDashboard = ({ flashMessages, setFlashMessages }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + '/tasks')
    .then(res => res.json())
    .then(data => {
      setTasks(data.tasks);
      setFilteredTasks(data.tasks);
    });
  }, [flashMessages]);
  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <div className="row">
              <h1>Tasks</h1>
              <p>The queue of deliveries that need to be made.</p>
              <p>Once a task is completed, select "More Info" then mark as "completed".</p>
              <hr />
            </div>
            <div className="row">
              <div className="col-sm-3">
                <TaskFilter
                  tasks={tasks}
                  filteredTasks={filteredTasks}
                  setFilteredTasks={setFilteredTasks}
                />
              </div>
              <div className="col-sm-9">
              {filteredTasks.map((task)  => (
                <TaskCard
                  key={`${task.type}-${task.task_date}-${task.renter.id}`}
                  setFlashMessages={setFlashMessages}
                  task={task}
                />
              ))}
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </main>
  );
}

export default TasksDashboard;
