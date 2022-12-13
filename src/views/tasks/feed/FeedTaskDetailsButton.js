import { useNavigate } from 'react-router-dom';

export const FeedTaskDetailsButton = ({ taskId }) => {
  const navigate = useNavigate();
  const handleTaskNavigate = () => navigate(`/task/${taskId}`);

  return (
    <button
      className="btn btn-dark btn-sm"
      onClick={handleTaskNavigate}
      type="button"
    >
      See details {"->"}
    </button>
  );
}
