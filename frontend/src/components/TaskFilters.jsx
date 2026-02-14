export default function TaskFilters({
  isAdmin,
  value, //meta
  onChange,
  onApply,
  onReset,
}) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={value.status}
              onChange={(e) =>
                onChange({ ...value, status: e.target.value, page: 1 })
              }
            >
              <option value="">All</option>
              <option value="pending">pending</option>
              <option value="in_progress">in_progress</option>
              <option value="completed">completed</option>
            </select>
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              value={value.priority}
              onChange={(e) =>
                onChange({ ...value, priority: e.target.value, page: 1 })
              }
            >
              <option value="">All</option>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>

          {isAdmin && (
            <div className="col-12 col-md-3">
              <label className="form-label">User ID (optional)</label>
              <input
                className="form-control"
                placeholder="Filter by userId"
                value={value.userId}
                onChange={(e) =>
                  onChange({ ...value, userId: e.target.value, page: 1 })
                }
              />
            </div>
          )}

          <div className="col-12 col-md-3">
            <label className="form-label">Sort</label>
            <div className="d-flex gap-2">
              <select
                className="form-select"
                value={value.sortBy}
                onChange={(e) =>
                  onChange({ ...value, sortBy: e.target.value, page: 1 })
                }
              >
                <option value="createdAt">createdAt</option>
                <option value="dueDate">dueDate</option>
                <option value="priority">priority</option>
              </select>

              <select
                className="form-select"
                value={value.order}
                onChange={(e) =>
                  onChange({ ...value, order: e.target.value, page: 1 })
                }
              >
                <option value="desc">desc</option>
                <option value="asc">asc</option>
              </select>
            </div>
          </div>

          <div className="col-12 d-flex gap-2">
            <button className="btn btn-dark" onClick={onApply}>
              Apply
            </button>
            <button className="btn btn-outline-secondary" onClick={onReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}