import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTasksApi, deleteTaskApi } from "src/api/taskApi";
import TaskFilters from "src/components/TaskFilters";
import TaskCard from "src/components/TaskCard";
import Pagination from "src/components/Pagination";
import { useAuth } from "src/context/AuthContext";

export default function TasksList() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  const [query, setQuery] = useState({
    page: 1,
    limit: 9,
    status: "",
    priority: "",
    userId: "",
    sortBy: "createdAt",
    order: "desc",
  });

  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const params = {
        page: query.page,
        limit: query.limit,
        status: query.status || undefined,
        priority: query.priority || undefined,
        sortBy: query.sortBy,
        order: query.order,
        ...(isAdmin && query.userId ? { userId: query.userId } : {}),
      };

      const res = await fetchTasksApi(params); 
      setTasks(res.data || []);
      setMeta(res.meta || null);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to load tasks",
      );
      setTasks([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  }, [isAdmin, query.page, query.limit, query.status, query.priority, query.sortBy, query.order, query.userId]);

  useEffect(() => {
    load();
  }, [load]);

  const applyFilters = () => {
    setQuery((p) => ({ ...p, page: 1 })); 
    load();
  };

  const resetFilters = () => {
    const next = {
      page: 1,
      limit: 9,
      status: "",
      priority: "",
      userId: "",
      sortBy: "createdAt",
      order: "desc",
    };
    setQuery(next);
    
    setTimeout(() => load(), 0);
  };

  const onDelete = async (id) => {
    const ok = window.confirm("Delete this task?");
    if (!ok) return;

    try {
      await deleteTaskApi(id);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Delete failed");
    }
  };

  const showEmptyState = !loading && !error && tasks.length === 0;

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h3 className="mb-0">Tasks</h3>
        <button
          className="btn btn-dark"
          onClick={() => navigate("/tasks/create")}
        >
          {isAdmin ? "Create / Assign Task" : "Create Task"}
        </button>
      </div>

      <TaskFilters
        isAdmin={isAdmin}
        value={query}
        onChange={setQuery}
        onApply={applyFilters}
        onReset={resetFilters}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      {loading && <div className="alert alert-secondary">Loading tasks...</div>}

      {showEmptyState ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-center">
            <h5 className="mb-2">No tasks created yet</h5>
            <p className="text-muted mb-3">
              {isAdmin
                ? "No tasks match your current filters. Try resetting filters or create a new task."
                : "You don’t have any tasks yet. Create your first task to get started."}
            </p>

            <div className="d-flex justify-content-center gap-2">
              <button
                className="btn btn-dark"
                onClick={() => navigate("/tasks/create")}
              >
                {isAdmin ? "Create / Assign Task" : "Create Task"}
              </button>

              {isAdmin && (
                <button
                  className="btn btn-outline-secondary"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="row g-3">
            {tasks.map((t) => (
              <div className="col-12 col-md-6 col-lg-4" key={t._id}>
                <TaskCard
                  task={t}
                  onView={() => navigate(`/tasks/${t._id}`)}
                  onEdit={() =>
                    navigate(`/tasks/${t._id}/edit`, {
                      state: { returnTo: "/tasks" },
                    })
                  }
                  onDelete={() => onDelete(t._id)}
                />
              </div>
            ))}
          </div>

          <Pagination
            meta={meta}
            onPageChange={(newPage) =>
              setQuery((p) => ({ ...p, page: newPage }))
            }
          />
        </>
      )}
    </div>
  );
}