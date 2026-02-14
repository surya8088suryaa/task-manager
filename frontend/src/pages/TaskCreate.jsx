import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTaskApi } from "../api/taskApi";
import TaskForm from "../components/TaskForm";
import { useAuth } from "../context/AuthContext";

export default function TaskCreate() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const submit = async (payload) => {
    setError("");
    try {
      await createTaskApi(payload);
      navigate("/tasks", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Create failed");
    }
  };

  return (
    <div>
      <h3 className="mb-3">Create Task</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <TaskForm
        initialValues={{
          title: "",
          description: "",
          status: "pending",
          priority: "medium",
          dueDate: "",
          userId: "",
        }}
        isAdmin={isAdmin}
        onSubmit={submit}
        onBack={() => navigate("/tasks")}
        submitLabel="Create"
      />
    </div>
  );
}