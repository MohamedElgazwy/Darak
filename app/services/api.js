import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      const user = JSON.parse(localStorage.getItem("user") || "null");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (user?.role) {
        config.headers["x-user-role"] = user.role;
      }

      if (user?.subscriptionPlan) {
        config.headers["x-subscription-plan"] = user.subscriptionPlan;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      const status = error.response?.status;
      const code = error.response?.data?.code;

      if (status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        window.location.href = "/Auth";
      }

      if (status === 403 && code === "PLAN_LIMIT_REACHED") {
        window.dispatchEvent(
          new CustomEvent("mawa:subscription-limit", {
            detail: error.response?.data,
          })
        );
      }

      if (status === 402 && error.response?.data?.upgradeUrl) {
        window.location.href = error.response.data.upgradeUrl;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
