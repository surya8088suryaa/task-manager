import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import TasksList from "./pages/TasksList";
import TaskCreate from "./pages/TaskCreate";
import TaskDetails from "./pages/TaskDetails";
import TaskEdit from "./pages/TaskEdit";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

import { useAuth } from "./context/AuthContext";

function HomeRedirect() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/tasks" : "/login"} replace />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container my-4">
        <Router>
          {/* Public */}
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* NotFound explicit */}
          <Route path="/not-found" element={<NotFound />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TasksList />} />
            <Route path="/tasks/create" element={<TaskCreate />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
            <Route path="/tasks/:id/edit" element={<TaskEdit />} />

            {/* Admin-only */}
            <Route element={<AdminRoute />}>
              <Route path="/users" element={<Users />} />
            </Route>
          </Route>

          {/* Wildcard */}
          <Route path="*" element={<NotFound />} />
        </Router>
      </div>
    </>
  );
}