import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link
          className="navbar-brand"
          to={isAuthenticated ? "/tasks" : "/login"}
        >
          Task Manager
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#tm_navbar"
          aria-controls="tm_navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="tm_navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/tasks">
                    Tasks
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/tasks/create">
                    Create Task
                  </NavLink>
                </li>

                {user?.role === "admin" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/users">
                      Users
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </ul>

          {isAuthenticated && (
            <div className="d-flex align-items-center gap-3">
              <span className="text-light small d-none d-lg-inline">
                {user?.email} ({user?.role})
              </span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}