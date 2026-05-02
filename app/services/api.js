import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (typeof window !== "undefined") {
      // 🔴 Unauthorized
      if (status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");

        window.location.href = "/login";
      }

      // 🟠 Forbidden
      if (status === 403) {
        console.warn("ليس لديك صلاحية الوصول");
      }

      // 🔴 Server Error
      if (status >= 500) {
        console.error("خطأ في السيرفر");
      }
    }

    return Promise.reject(error);
  }
);

export default api;