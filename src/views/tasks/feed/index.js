import { useState, useEffect, useContext } from 'react';

import { FlashContext } from '../../providers/FlashProviders';

export const Index = () => {

  const defaultOrder = { item: {} };
  const defaultCourier = {};
  const defaultTask = {
    orders: [defaultOrder],
    couriers: [defaultCourier],
    sender: {},
    receiver: {}
  };
  const [tasks, setTasks] = useState([defaultTask])
  const [feedTasks, setFeedTasks] = useState([defaultTask])

  useEffect(() => {

    const getData = async(url) => {
      const response = await fetch(url, { mode: 'cors', credentials: 'include' });
      const responseClone = response.clone();

      const data = await responseClone.json();

      setTasks(data.tasks);
      setFeedTasks(data.tasks);
      return response;
    }

    const cacheData = async(response) => {
      if (response.ok) {
        const tasksFeedCache = await caches.open('tasksFeedData');

        tasksFeedCache.delete(process.env.REACT_APP_SERVER + '/tasks/feed');
        tasksFeedCache.put(process.env.REACT_APP_SERVER + '/tasks/feed', response)
        .catch(console.error);
      }
    };

    const getCachedData = async(url) => {
      const cacheStorage = await caches.open('tasksFeedData');
      const cachedResponse = await cacheStorage.match(url);

      if (cachedResponse) {
        const cachedData = await cachedResponse.json();

        setIsLoading(false);
      } else {
        getData(process.env.REACT_APP_SERVER + `/tasks/feed`)
        .then(cacheData)
        .catch(console.error);
      }
    };

  }, [feedTasks]);

  return (

  );
}
