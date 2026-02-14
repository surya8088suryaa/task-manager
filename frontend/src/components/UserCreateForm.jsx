import React, { useState } from "react";

export default function UserCreateForm({ onCreate }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    await onCreate(form);
    setForm({ name: "", email: "", password: "", role: "user" });
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="mb-3">Create User</h5>

        <form onSubmit={onSubmit}>
          <div className="row g-3">
            <div className="col-12 col-md-3">
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

            <div className="col-12 col-md-4">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                minLength={6}
                required
              />
            </div>

            <div className="col-12 col-md-2">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                name="role"
                value={form.role}
                onChange={onChange}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <div className="col-12">
              <button className="btn btn-dark">Create User</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}