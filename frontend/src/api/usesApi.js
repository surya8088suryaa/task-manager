import axiosClient from "./axiosClient";

export const fetchUsersApi = async (params) => {
  const res = await axiosClient.get("/users", { params });
  return res.data; // { success, message, data: users[], meta: {...} }
};

export const createUserApi = async (payload) => {
  const res = await axiosClient.post("/users", payload);
  return res.data; // { success, message, data: user }
};

export const updateUserApi = async (id, payload) => {
  const res = await axiosClient.put(`/users/${id}`, payload);
  return res.data; // { success, message, data: user }
};

export const deleteUserApi = async (id) => {
  const res = await axiosClient.delete(`/users/${id}`);
  return res.data; // { success, message, data: {id} }
};