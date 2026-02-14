import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchTaskByIdApi, updateTaskApi } from "src/api/taskApi";
import TaskForm from "../components/TaskForm";
import { useAuth } from "../context/AuthContext";

export default function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  // ✅ Default fallback = TasksList
  const returnTo = location.state?.returnTo || "/tasks";

  const [task, setTask] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    setError("");
    try {
      const res = await fetchTaskByIdApi(id);

      const t = res.data;
      const normalizedUserId =
        t.userId && typeof t.userId === "object" ? t.userId._id : t.userId;

      setTask({ ...t, userId: normalizedUserId || "" });
    } catch {
      navigate("/not-found", { replace: true });
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const submit = async (payload) => {
    setError("");
    try {
      await updateTaskApi(id, payload);

      // ✅ Smart redirect
      navigate(returnTo, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Update failed");
    }
  };

  if (!task) return null;

  return (
    <div>
      <h3 className="mb-3">Edit Task</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <TaskForm
        initialValues={task}
        isAdmin={isAdmin}
        onSubmit={submit}
        onBack={() => navigate(returnTo)}
        submitLabel="Save"
      />
    </div>
  );
}