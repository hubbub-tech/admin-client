import { useState, useEffect, useContext } from 'react';

import { FlashContext } from '../../../providers/FlashProvider';
import { CoordsAutoInput } from '../../../inputs/lookup-address';

import { FeedSortOptions } from './FeedSortOptions';
import { FeedBanner } from './FeedBanner';
import { FeedGrid } from './FeedGrid';

export const Index = () => {

  const defaultOrder = { item: {} };
  const defaultCourier = {};
  const defaultTimeslot = {};

  const defaultTask = {
    orders: [defaultOrder],
    couriers: [defaultCourier],
    timeslots: [defaultTimeslot],
    sender: {},
    receiver: {},
  };
  const [tasks, setTasks] = useState([defaultTask])
  const [feedTasks, setFeedTasks] = useState([defaultTask])

  const defaultCoords = { "lat": undefined, "lng": undefined };
  const [coords, setCoords ] = useState(defaultCoords);
  const [orderBy, setOrderBy] = useState(undefined);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const getData = async(url) => {
      const response = await fetch(url, { mode: 'cors', credentials: 'include' });
      const responseClone = response.clone();

      const data = await responseClone.json();

      setTasks(data.tasks);
      setFeedTasks(data.tasks);
      setIsLoading(false);
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
        setTasks(cachedData.tasks);
        setFeedTasks(cachedData.tasks);
        setIsLoading(false);
      } else {
        getData(process.env.REACT_APP_SERVER + `/tasks/feed`)
        .then(cacheData)
        .catch(console.error);
      }
    };

    setIsLoading(true);
    getCachedData(process.env.REACT_APP_SERVER + '/tasks/feed')
    .catch(console.error);
  }, []);


  const handleOrderByProximity = (type) => {
    const orderByProximity = (a, b) => {

      let aLat, aLng, bLat, bLng;
      if (type === 'fromProximity') {
        aLat = parseInt(a.from_addr_lat);
        aLng = parseInt(a.from_addr_lng);

        bLat = parseInt(b.from_addr_lat);
        bLng = parseInt(b.from_addr_lng);
      } else {
        aLat = parseInt(a.to_addr_lat);
        aLng = parseInt(a.to_addr_lng);

        bLat = parseInt(b.to_addr_lat);
        bLng = parseInt(b.to_addr_lng);
      }

      const distToA2 = Math.pow(aLat - coords.lat, 2) + Math.pow(aLng - coords.lng, 2);
      const distToA = Math.pow(distToA2, 0.5);

      const distToB2 = Math.pow(bLat - coords.lat, 2) + Math.pow(bLng - coords.lng, 2);
      const distToB = Math.pow(distToB2, 0.5);

      return (distToA > distToB)
        ? 1
        : (distToA === distToB && a.is_featured && b.is_featured === false) ? 1 : -1;
    };

    setFeedTasks([...feedTasks].sort(orderByProximity));
  };

  useEffect(() => {
    if (orderBy === 'fromProximity') handleOrderByProximity('fromProximity');
    else if (orderBy === 'toProximity') handleOrderByProximity('toProximity');
    else setFeedTasks([...tasks]);
  }, [orderBy, coords]);

  return (
    <main>
      <section className="my-lg-14 my-8">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6 col-12">
              <FeedBanner />
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <FeedSortOptions
                location={coords}
                setOrderBy={setOrderBy}
              />
            </div>
          </div>
          {(orderBy === "fromProximity" || orderBy === "toProximity") &&
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12">
                <CoordsAutoInput setCoords={setCoords} />
              </div>
            </div>
          }
          <div className="row">
            <div className="col-md-6 col-12 mb-md-5 me-auto">
              <FeedGrid tasks={feedTasks} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
