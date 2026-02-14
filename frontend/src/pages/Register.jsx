import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "src/api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await registerApi(form);

      setSuccess("Account created successfully! Redirecting to login...");

      // Delay redirect slightly so user sees confirmation
      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: { justRegistered: true },
        });
      }, 1200);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Register failed",
      );
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 col-lg-5">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h3 className="mb-3">Register</h3>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  minLength={3}
                  required
                />
              </div>

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
                  minLength={6}
                  required
                />
              </div>

              <button className="btn btn-dark w-100" type="submit">
                Create account
              </button>
            </form>

            <div className="mt-3 text-center">
              <span className="text-muted">Already have an account? </span>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}