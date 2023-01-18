import { useEffect } from 'react';

import { RecordTableRow } from "./RecordTableRow";
import { RecordTableHead } from "./RecordTableHead";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const RecordTable =  ({ orders, isLoading }) => {

    useEffect(() => {
        console.log("Page reload!");
    }, [orders, isLoading]);

    return (isLoading)
        ?   <div className="card mx-2 my-2">
                <div className="card-body">
                    <Skeleton width="100%" />
                </div>
            </div>
        :   <table className="table table-sm">
                <RecordTableHead />
                <tbody>
                    {orders.map((order) => (
                        <RecordTableRow key={order.id} order={order} />
                    ))}
                </tbody>
            </table>
}