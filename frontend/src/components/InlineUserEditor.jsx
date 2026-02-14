import React, { useState } from "react";

export default function InlineUserEditor({ user, onCancel, onSave }) {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    role: user.role || "user",
    password: "",
  });

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();

    // Send password only if admin typed it
    const payload = {
      name: form.name,
      email: form.email,
      role: form.role,
      ...(form.password ? { password: form.password } : {}),
    };

    await onSave(user._id, payload);
  };

  return (
    <form onSubmit={submit} className="p-3 bg-light border rounded">
      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            name="name"
            value={form.name}
            onChange={onChange}
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

        <div className="col-12 col-md-3">
          <label className="form-label">Reset Password (optional)</label>
          <input
            className="form-control"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="Leave blank to keep"
            minLength={6}
          />
        </div>

        <div className="col-12 d-flex gap-2">
          <button className="btn btn-primary" type="submit">
            Save
          </button>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}