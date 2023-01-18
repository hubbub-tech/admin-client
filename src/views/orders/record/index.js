import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { RecordTable } from './RecordTable';
import { RecordPagination } from './RecordPagination';

export const Index = () => {

  let [searchParams, setSearchParams] = useSearchParams();

  const initOrder = {};
  const [orders, setOrders] = useState([initOrder]);
  const [isLoading, setIsLoading] = useState(true);

  const defaultPageNumber = 1;
  const defaultPageAmount = 25;
  const [pageMax, setPageMax] = useState(defaultPageNumber);
  const [currPage, setCurrPage] = useState(defaultPageNumber);
  const [pageAmount, setPageAmount] = useState(defaultPageAmount);

  useEffect(() => {

    setIsLoading(true);
    const paramsString = searchParams.toString();

    const getData = async(url) => {
      const response = await fetch(url, { mode: 'cors', credentials: 'include' });
      const data = await response.json();

      setOrders(data.orders);
      setPageMax(data.page_max);
      setCurrPage(data.page_number);
      setPageAmount(data.page_amount);
      setIsLoading(false);
      return response;
    }

    getData(process.env.REACT_APP_SERVER + `/orders?${paramsString}`)
    .catch(console.error);
  }, [searchParams]);

  return (
    <main>
      <RecordTable orders={orders} isLoading={isLoading} />
      <RecordPagination 
        currPage={currPage} 
        setCurrPage={setCurrPage} 
        pageAmount={pageAmount}
        setPageAmount={setPageAmount}
        pageMax={pageMax} 
      />
    </main>
  );
}