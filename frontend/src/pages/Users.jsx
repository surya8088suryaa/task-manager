import React, { useEffect, useState } from "react";
import {
  createUserApi,
  deleteUserApi,
  fetchUsersApi,
  updateUserApi,
} from "src/api/userApi";
import Pagination from "../components/Pagination";
import UserCreateForm from "src/components/UserCreateForm";
import UserFilters from "src/components/UserFilters";
import InlineUserEditor from "src/components/InlineUserEditor";
import { formatDateTime } from "src/utils/format";

export default function Users() {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    role: "",
    email: "",
    sortBy: "createdAt",
    order: "desc",
  });

  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    setError("");
    try {
      const params = {
        page: query.page,
        limit: query.limit,
        role: query.role || undefined,
        email: query.email || undefined,
        sortBy: query.sortBy,
        order: query.order,
      };

      const res = await fetchUsersApi(params);
      setUsers(res.data || []);
      setMeta(res.meta || null);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to load users",
      );
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page]);

  const applyFilters = () => {
    setQuery((p) => ({ ...p, page: 1 }));
    load();
  };

  const resetFilters = () => {
    const next = {
      page: 1,
      limit: 10,
      role: "",
      email: "",
      sortBy: "createdAt",
      order: "desc",
    };
    setQuery(next);
    setTimeout(() => load(), 0);
  };

  const onCreateUser = async (payload) => {
    setError("");
    try {
      await createUserApi(payload);
      // reload first page to show newest (depending on sorting)
      setQuery((p) => ({ ...p, page: 1 }));
      load();
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Create user failed",
      );
    }
  };

  const onSaveUser = async (id, payload) => {
    setError("");
    try {
      const res = await updateUserApi(id, payload);
      const updated = res.data;

      setUsers((prev) => prev.map((u) => (u._id === id ? updated : u)));
      setEditingId(null);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Update user failed",
      );
    }
  };

  const onDeleteUser = async (id) => {
    const ok = window.confirm("Delete this user?");
    if (!ok) return;

    setError("");
    try {
      await deleteUserApi(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      // if we deleted last row on the page, you can reload:
      // load();
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Delete user failed",
      );
    }
  };

  return (
    <div>
      <h3 className="mb-3">Users (Admin)</h3>

      <UserCreateForm onCreate={onCreateUser} />

      <UserFilters
        value={query}
        onChange={setQuery}
        onApply={applyFilters}
        onReset={resetFilters}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "22%" }}>Name</th>
                <th style={{ width: "28%" }}>Email</th>
                <th style={{ width: "12%" }}>Role</th>
                <th style={{ width: "22%" }}>Created At</th>
                <th style={{ width: "16%" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <React.Fragment key={u._id}>
                  <tr>
                    <td>{u.name}</td>
                    <td className="text-muted">{u.email}</td>
                    <td>
                      <span
                        className={`badge ${u.role === "admin" ? "text-bg-warning" : "text-bg-secondary"}`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="text-muted">
                      {formatDateTime(u.createdAt)}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            setEditingId((prev) =>
                              prev === u._id ? null : u._id,
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onDeleteUser(u._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>

                  {editingId === u._id && (
                    <tr>
                      <td colSpan={5}>
                        <InlineUserEditor
                          user={u}
                          onCancel={() => setEditingId(null)}
                          onSave={onSaveUser}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        meta={meta}
        onPageChange={(p) => setQuery((prev) => ({ ...prev, page: p }))}
      />
    </div>
  );
}