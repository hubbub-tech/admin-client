import React from 'react';
import { useState, useEffect } from 'react';

import MiniTaskCard from '../cards/MiniTaskCard';
import TaskFilter from '../filters/TaskFilter';

const TasksDashboard = ({ flashMessages, setFlashMessages }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + '/tasks', {
      credentials: 'include'
    })
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
                <MiniTaskCard
                  key={`${task.type}-${task.task_date}-${task.renter.id}`}
                  setFlashMessages={setFlashMessages}
                  task={task}
                />
              ))}
              {filteredTasks.length === 0 &&
                <div className="col my-5">
                  <p className="text-center">
                    No tasks available. Check back later!
                  </p>
                </div>
              }
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
