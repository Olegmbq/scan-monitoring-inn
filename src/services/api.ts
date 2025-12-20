import axios from "axios";

const api = axios.create({
  baseURL: "https://gateway.scan-interfax.ru/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 👉 Автоматически подставляем токен
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
