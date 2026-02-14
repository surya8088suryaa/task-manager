import axiosClient from "src/api/axiosClient";

export const fetchTasksApi = async (params) => {
  const res = await axiosClient.get("/tasks", { params });
  return res.data; 
};

export const createTaskApi = async (payload) => {
  const res = await axiosClient.post("/tasks", payload);
  return res.data;
};
export const fetchTaskByIdApi = async (id) => {
  const res = await axiosClient.get(`/tasks/${id}`);
  return res.data; 
};
export const updateTaskApi = async (id, payload) => {
  const res = await axiosClient.put(`/tasks/${id}`, payload);
  return res.data; 
};
export const deleteTaskApi = async (id) => {
  const res = await axiosClient.delete(`/tasks/${id}`);
  return res.data;
};