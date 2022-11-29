import { useState, useEffect } from 'react';

import { FeedCard } from './FeedCard';

export const FeedGrid = ({ tasks = [], isLoading }) => {

  useEffect(() => {
    console.log("The feed has loaded!");
  }, [tasks, isLoading]);

  return (
    <div className="row">
    { tasks.map((task) => (
      <FeedCard key={task.id} task={task} />
    ))}
    </div>
  );
}
