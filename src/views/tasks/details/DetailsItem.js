import { TaskItemPhoto } from '../TaskItemPhoto';

import { useViewport } from '../../../hooks/Viewport';

import { printDate } from '../../utils.js';

export const DetailsItem = ({ order }) => {

  const viewport = useViewport();

  return (
    <div className="row gx-3 my-4">
      <div className="col-2">
        <TaskItemPhoto
          href={`/item/${order.item_id}`}
          src={order.item.image_url}
          className="img-fluid"
          alt={order.item.name}
        />
      </div>
      <div className="col-10">
        <h4 className="fs-md-5 fs-6 mb-1">{ order.item.name }</h4>
        <small className="text-success">
          { printDate(order.res_dt_start) } - { printDate(order.ext_dt_end) }
        </small>
        <p className="text-muted mt-2">{ order.item.description }</p>
      </div>
    </div>
  );
}
