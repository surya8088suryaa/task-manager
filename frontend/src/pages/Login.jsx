import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginApi } from "src/api/authApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const justRegistered = Boolean(location.state?.justRegistered);

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks", { replace: true });
  }, [isAuthenticated, navigate]);

  // Optional: clear the "justRegistered" state after showing it once
  useEffect(() => {
    if (!justRegistered) return;
    // Replace current entry with same path but without state
    navigate(".", { replace: true, state: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = await loginApi(form);
      const token = payload?.data?.token;
      const user = payload?.data?.user;

      if (!token || !user) {
        setError("Login response missing token/user.");
        return;
      }

      login({ token, user });

      const from = location.state?.from;
      navigate(from || "/tasks", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Login failed");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 col-lg-5">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h3 className="mb-3">Login</h3>

            {justRegistered && (
              <div className="alert alert-success">
                Registration successful. Please login.
              </div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  required
                />
              </div>

              <button className="btn btn-dark w-100" type="submit">
                Login
              </button>
            </form>

            <div className="mt-3 text-center">
              <span className="text-muted">Don't have an account? </span>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}