export default function UserFilters({ value, onChange, onApply, onReset }) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={value.role}
              onChange={(e) =>
                onChange({ ...value, role: e.target.value, page: 1 })
              }
            >
              <option value="">All</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label">Email (exact match)</label>
            <input
              className="form-control"
              placeholder="e.g. huma@example.com"
              value={value.email}
              onChange={(e) =>
                onChange({ ...value, email: e.target.value, page: 1 })
              }
            />
          </div>

          <div className="col-12 col-md-5">
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
                <option value="name">name</option>
                <option value="email">email</option>
                <option value="role">role</option>
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