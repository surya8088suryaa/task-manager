import { useEffect, useState } from "react";
import { fetchUsersApi } from "src/api/userApi";
import { useAuth } from "../context/AuthContext";

export default function TaskForm({
  initialValues,
  isAdmin,
  onSubmit,
  onBack,
  submitLabel,
}) {
  const { user } = useAuth();
  const meId = user?.userId || user?._id;

  const [form, setForm] = useState({
    title: initialValues.title || "",
    description: initialValues.description || "",
    status: initialValues.status || "pending",
    priority: initialValues.priority || "medium",
    dueDate: initialValues.dueDate ? initialValues.dueDate.slice(0, 10) : "",
    userId: initialValues.userId || "",
  });

  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState("");

  
  useEffect(() => {
    const run = async () => {
      if (!isAdmin) return;

      setUsersError("");
      try {
  
        const res = await fetchUsersApi({ page: 1, limit: 200 });
        const list = res?.data || [];

        
        const me = meId ? list.find((u) => u._id === meId) : null;
        const others = meId ? list.filter((u) => u._id !== meId) : list;
        const ordered = me ? [me, ...others] : list;

        setUsers(ordered);

        setForm((p) => ({
          ...p,
          userId: p.userId || meId || ordered[0]?._id || "",
        }));
      } catch (e) {
        setUsersError(
          e?.response?.data?.message || e?.message || "Failed to load users",
        );
      }
    };

    run();

  }, [isAdmin, meId]);

  const change = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      dueDate: form.dueDate ? form.dueDate : null,
    };

    if (isAdmin) {
      if (form.userId) payload.userId = form.userId;
      else if (meId) payload.userId = meId;
    }

    await onSubmit(payload);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <form onSubmit={submit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                name="title"
                value={form.title}
                onChange={change}
                minLength={2}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={form.description}
                onChange={change}
                rows={3}
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="status"
                value={form.status}
                onChange={change}
              >
                <option value="pending">pending</option>
                <option value="in_progress">in_progress</option>
                <option value="completed">completed</option>
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                name="priority"
                value={form.priority}
                onChange={change}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label">Due Date</label>
              <input
                className="form-control"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={change}
              />
            </div>

            {isAdmin && (
              <div className="col-12">
                <label className="form-label">Assign To</label>

                {usersError && (
                  <div className="text-danger small mb-1">{usersError}</div>
                )}

                <select
                  className="form-select"
                  name="userId"
                  value={form.userId || ""}
                  onChange={change}
                  disabled={users.length === 0}
                >
                  {users.length === 0 ? (
                    <option value="">
                      {usersError ? "Unable to load users" : "Loading users..."}
                    </option>
                  ) : (
                    users.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name} ({u.email}){u._id === meId ? " — me" : ""}
                      </option>
                    ))
                  )}
                </select>

                <div className="form-text">
                  Default is you. Choose another user to assign.
                </div>
              </div>
            )}

            <div className="col-12 d-flex gap-2 mt-2">
              <button className="btn btn-dark" type="submit">
                {submitLabel}
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={onBack}
              >
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}