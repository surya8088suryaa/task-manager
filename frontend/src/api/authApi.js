import axiosClient from "src/api/axiosClient";

export const loginApi = async ({ email, password }) => {
  const res = await axiosClient.post("/auth/login", { email, password });
  return res.data; //success,message,data : {token,user}
};

export const registerApi = async ({ name, email, password }) => {
  const res = await axiosClient.post("/auth/register", { name, email, password });
  return res.data; //success,message, data: safeUser
};