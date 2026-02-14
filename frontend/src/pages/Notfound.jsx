import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4">404</h1>
      <p className="text-muted mb-4">Page not found.</p>

      <div className="d-flex justify-content-center gap-2">
        <Link className="btn btn-dark" to="/tasks">
          Go to Tasks
        </Link>
        <Link className="btn btn-outline-secondary" to="/login">
          Go to Login
        </Link>
      </div>
    </div>
  );
}