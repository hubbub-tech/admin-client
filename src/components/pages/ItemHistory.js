import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ItemHistory = ({ setFlashMessages }) => {
  const { itemId } = useParams();
  const [item, setItem] = useState({
    "lister": {},
    "calendar": {},
    "details": {},
    "address": {},
    "orders": []
  });
  const [urlBase, setUrlBase] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + `/item/history/id=${itemId}`, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      setItem(data.item);
      setUrlBase(data.photo_url);
    });
  }, [itemId]);
  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <h2 className="text-start">{ item.name }</h2>
            <p className="text-start fs-4 mb-5"><span>Listed by </span>
              <a
                href={`https://www.hubbub.shop/accounts/u/id=${item.lister.id}`}
                target="_blank"
                rel="noreferrer"
                >
                {item.lister.name}
              </a>
            </p>
            <div className="row">
              <div className="col-sm-4 mb-3">
                <img
                  className="card-img-top rounded"
                  src={`${urlBase}/${item.id}.jpg`}
                  alt={item.name}
                />
              </div>
              <div className="col-sm-8 mb-3">
                <div className="card mb-3">
                  <div className="card-body">
                    <p className="text-start fs-5 fw-bold">Description</p>
                    <p className="text-start">{ item.details.description }</p>
                    <p className="text-start fs-5 fw-bold mt-2">Original Rental Period</p>
                    <p className="text-start">{ item.calendar.date_started } to { item.calendar.date_ended }</p>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </main>
  );
}

export default ItemHistory;
