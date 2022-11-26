import React from 'react';
import { useState, useEffect } from 'react';

const TaskFilter = ({ tasks, filteredTasks, setFilteredTasks }) => {
  const onChangeTaskType = (e) => {
    let newFilteredTasks = []
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].type == e.target.value) {
        newFilteredTasks.push(tasks[i]);
      }
    }
    setFilteredTasks(newFilteredTasks);
  }
  return (
    <div className="row">
      <div className="col-12 my-2">
        <h5 className="text-start">Task Type</h5>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="TaskType"
              id="dropoffs-only"
              value="dropoff"
              onChange={onChangeTaskType}
            />
            <label className="form-check-label" htmlFor="dropoffs-only">
              Dropoffs-Only
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="TaskType"
              id="pickups-only"
              value="pickup"
              onChange={onChangeTaskType}
            />
            <label className="form-check-label" htmlFor="pickups-only">
              Pickups-Only
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="TaskType"
              id="all"
              onChange={() => setFilteredTasks(tasks)}
            />
            <label className="form-check-label" htmlFor="all">
              All Tasks
            </label>
          </div>
      </div>
    </div>
  );
}

export default TaskFilter;
