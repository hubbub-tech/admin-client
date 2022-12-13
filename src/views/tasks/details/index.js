import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { DetailsItem } from './DetailsItem';
import { DetailsActionCard } from './DetailsActionCard';
import { DetailsRouteMap } from './DetailsRouteMap';

import { printDate } from '../../utils.js';

import { SessionContext } from '../../../providers/SessionProvider';
import { FlashContext } from '../../../providers/FlashProvider';

export const Index = () => {

  const { taskId } = useParams();
  const navigate = useNavigate();

  const { courierId, courierSessionToken } = useContext(SessionContext);
  const { renderFlash } = useContext(FlashContext);

  const defaultTask = { sender: {}, receiver: {} };
  const [task, setTask] = useState(defaultTask);

  const defaultOrder = { item: {}, extensions: [{}] };
  const [orders, setOrders] = useState([defaultOrder]);

  const [timeslots, setTimeslots] = useState([]);
  const [couriers, setCouriers] = useState([]);

  const [schedEta, setSchedEta] = useState("Loading...");

  useEffect(() => {

    const getData = async(url) => {
      const response = await fetch(url, { mode: "cors", credentials: "include", redirect: "follow" });
      const data = await response.json();

      if (!response.ok) {
        renderFlash(data.message, "warning", 10000);
        navigate("/tasks/feed");
      }

      setTask(data.task);
      setOrders(data.orders);
      setCouriers(data.couriers);
      setTimeslots(data.timeslots);

      if (data.task.dt_sched_eta) {
        let dtSchedEta = new Date(data.task.dt_sched_eta) * 1000;
        let schedLabel = printDate(dtSchedEta / 1000, "PP h:mm aaa");
        setSchedEta("You set task time to " + schedLabel);
      } else {
        setSchedEta(" Please set a task time.");
      }
    };

    getData(process.env.REACT_APP_SERVER + `/task/${taskId}`)
    .catch(console.error);
  }, []);

  return (
    <main>
      <section className="mt-lg-5 mt-4">
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-10 mx-auto">
              <h1>Task (id: {task.id})</h1>
              <p>Specialized management for tasks with all the details you need.</p>
              <p>Chose a time for dropoff/pickup. Then when the task is complete, confirm here.</p>
              <p>{ schedEta }</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <div className="row mb-3">
                <div className="col-sm-6 col-12">
                  <DetailsActionCard taskId={task.id} dtDue={task.dt_due} timeslots={timeslots} />
                  <p className="fw-bold mt-3">Route</p>
                  <p>From: { task.from_addr_formatted }</p>
                  <p>To: { task.to_addr_formatted }</p>
                  <p className="fw-bold mt-3">Notes</p>
                  <p>{ task.notes }</p>
                  <p className="fw-bold mt-3">Orders</p>
                  {orders.map((order) => (
                    <DetailsItem key={order.id} order={order} />
                  ))}
                </div>
                <div className="col-sm-6 col-12">
                  <DetailsRouteMap marker={{ lat: task.from_addr_lat, lng: task.from_addr_lng }} />
                </div>
              </div>
            </div>
            <div className="col-sm-1"></div>
          </div>
          <div className="row mb-5">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <p className="fw-bold mt-3">More Details</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="col-sm-1"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
