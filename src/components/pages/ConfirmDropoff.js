import React from 'react';

import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

import ConfirmDropoffForm from '../forms/ConfirmDropoffForm';

const ConfirmDropoff = ({ setFlashMessages }) => {
  let statusOK;
  const history = useHistory();
  const { orderId } = useParams();
  const [order, setOrder] = useState({
    "renter": {},
    "lister": {},
    "reservations": [],
    "extensions": [],
    "dropoff": {
      "logistics": {}
    },
    "pickup": {
      "logistics": {}
    },
    "item": {
      "details": {}
    }
  });
  const [urlBase, setUrlBase] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + `/order/summary/id=${orderId}`)
    .then(res => res.json())
    .then(data => {
      setOrder(data.order);
      setUrlBase(data.photo_url);
    });
  }, [orderId]);

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  return (
    <main>
      <div className="container-md">
        <div className="row mt-5">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <h2 className="text-start">Confirm Dropoff for { order.item.name }</h2>
            <p className="text-start fs-4">with renter, { order.renter.name }</p>
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="row mb-3">
          <div className="col-md-1"></div>
          <div className="col-md-3 mt-5">
            <img
              className="card-img img-fluid"
              src={`${urlBase}/${order.item.id}.jpg`}
              alt={order.item.name}
            />
          </div>
          <div className="col-md-7 mt-5">
            <div className="card px-0 mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mt-4">
                    <h4 className="text-start fw-bold">Set a Specific Time for Dropoff</h4>
                    <hr />
                    <h4 className="text-start fw-bold">Specs</h4>
                    <p className="text-start">{ order.item.details.description }</p>
                    <p className="text-start my-1">See the items history page to read more about this item.</p>
                    <div className="d-grid gap-2 mt-3">
                      <Link to={`/item/history/id=${order.item.id}`} className="btn btn-outline-dark">See Details</Link>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <ConfirmDropoffForm order={order} setFlashMessages={setFlashMessages} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </main>
  );
}

export default ConfirmDropoff;
