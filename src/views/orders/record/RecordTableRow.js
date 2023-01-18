import { useEffect, useState } from "react";

import { printDate } from '../../utils.js';


export const RecordTableRow =  ({ order }) => {

    const [rowClassName, setRowClassName] = useState("text-dark");
    const [labelOrderStart, setLabelOrderStart] = useState("Loading...");
    const [labelOrderEnd, setLabelOrderEnd] = useState("Loading...");

    const [isExtended, setIsExtended] = useState(false);

    useEffect(() => {
        const extDtEnd = new Date(order.ext_dt_end * 1000);
        const dateToday = new Date();

        (dateToday > extDtEnd)
            ?   setRowClassName("table-light text-muted")
            :   setRowClassName("text-dark");

        const orderStartStr = printDate(order.res_dt_start);
        const orderEndStr = printDate(order.ext_dt_end);

        setLabelOrderStart(orderStartStr);
        setLabelOrderEnd(orderEndStr);

        setIsExtended(order.res_dt_end === order.ext_dt_end);
    }, []);

    return (
        <tr className={rowClassName}>
            <th scope="col">{order.id}</th>
            <td scope="col">{order.item_name}</td>
            <td scope="col">{order.renter_name}</td>
            <td scope="col">{labelOrderStart}</td>
            <td scope="col">{labelOrderEnd}</td>
            <td scope="col">
                <input className="form-check-input" type="checkbox" checked={isExtended} disabled={true} />
            </td>
        </tr>
    );
}