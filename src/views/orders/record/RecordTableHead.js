import { useEffect, useState } from "react";

export const RecordTableHead =  () => {
    return (
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Renter</th>
                <th scope="col">Start</th>
                <th scope="col">End</th>
                <th scope="col">Extended?</th>
            </tr>
        </thead>
    );
}