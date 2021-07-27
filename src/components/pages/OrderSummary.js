import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const OrderSummary = () => {
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
  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <h2 className="text-start">{ order.renter.name }</h2>
            <p className="text-start fs-4 mb-5">Rental of
              <Link to={`/item/history/id=${order.item.id}`}> {order.item.name}</Link>
            </p>
            <div className="row">
              <div className="col-sm-4 mb-3">
                <img
                  className="card-img-top rounded"
                  src={`${urlBase}/${order.item.id}.jpg`}
                  alt={order.item.name}
                />
              </div>
              <div className="col-sm-8 mb-3">
                <p className="text-start fs-5 fw-bold">Description</p>
                <p className="text-start">{ order.item.details.description }</p>
                <p className="text-start fs-5 fw-bold mt-2">Original Rental Period</p>
                <p className="text-start">{ order.res_date_start } to { order.res_date_end }</p>
                <p className="text-start fs-5 fw-bold mt-2">Is Extended:
                  <span className="text-hubbub">
                    {order.res_date_end !== order.ext_date_end ? ' Yes': ' No'}
                  </span>
                </p>
                {order.res_date_end !== order.ext_date_end &&
                  <p className="text-start">Extended to { order.ext_date_end }</p>
                }
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12">
                FILLER
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </main>
  );
}

export default OrderSummary;
