// api.js
import axios from "axios";

// 🔧 Instance
const api = axios.create({
    baseURL: "http://localhost:9000/api/v1/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔐 Request Interceptor (Token attach)
api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// 🚨 Response Interceptor (Error handle)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

// 🚀 API Methods (same file me hi)
export const getData = (url: string, config = {}) => api.get(url, config);

export const postData = (url: string, data: any, config = {}) =>
    api.post(url, data, config);

export const putData = (url: string, data: any, config = {}) =>
    api.put(url, data, config);

export const deleteData = (url: string, config = {}) =>
    api.delete(url, config);

export default api;