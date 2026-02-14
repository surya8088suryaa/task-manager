import { formatDate } from "src/utils/format";
import { getPriorityBadgeClass, getStatusBadgeClass } from "src/utils/badges";

export default function TaskCard({ task, onView, onEdit, onDelete }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-2">{task.title}</h5>

        <div className="mb-1 d-flex align-items-center gap-2">
          <span className={`badge ${getStatusBadgeClass(task.status)}`}>
            {task.status}
          </span>
        </div>

        <div className="mb-1 d-flex align-items-center gap-2">
          <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        <div className="mb-0 d-flex align-items-center gap-2">
          <span className="badge text-bg-dark">{formatDate(task.dueDate)}</span>
        </div>
      </div>

      <div className="card-footer bg-white border-0 d-flex gap-2">
        <button className="btn btn-sm btn-outline-dark" onClick={onView}>
          View
        </button>
        <button className="btn btn-sm btn-outline-primary" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}