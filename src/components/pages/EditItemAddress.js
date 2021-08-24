import React from 'react';
import { useState, useEffect } from 'react';

import EditAddressForm from '../forms/EditAddressForm';

const EditItemAddress = ({ setFlashMessages }) => {
  const [item, setItem] = useState({
    "details": {},
    "address": {}
  });
  const addressDisplay = `${item.address.num} ${item.address.street} ${item.address.apt !== '' ? `Apt ${item.address.apt}` : ''}, ${item.address.city}, ${item.address.state} ${item.address.zip_code}`;

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + `/item/id=${itemId}`, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => setItem(data.item));
  }, []);
  return (
    <main>
      <br />

      <br />
        <div className="container-md">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <h1 className="text-center">Change Address</h1>
              <p className="text-center">Address on record: <strong className="text-hubbub">{addressDisplay}</strong></p>
            </div>
            <div className="col-sm-1"></div>
          </div>
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <EditAddressForm item={item} setFlashMessages={setFlashMessages} />
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      <br />
    </main>
  );
}

export default EditItemAddress;
