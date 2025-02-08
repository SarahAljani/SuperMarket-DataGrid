import axios from "axios";
const base_url = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: base_url,
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const auth = token ? `Bearer ${token}` : "";

  config.headers["Authorization"] = auth;
  return Promise.resolve(config);
});
