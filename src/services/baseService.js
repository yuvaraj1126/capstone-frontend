import axios from "axios";


// const BASE_URL = "http://localhost:5000/api"
const BASE_URL = "https://capstone-backend-uv.onrender.com/api"

export class BaseService {
  constructor() {
    this.httpClient = axios.create({ baseURL: BASE_URL });

    // Add request interceptor
    this.httpClient.interceptors.request.use((request) => {
      if (!request.headers?.Authorization) {
        const token = localStorage.getItem("token");
        if (token) {
          request.headers = {
            ...request.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      }
      return request;
    });

    // Add response interceptor
    this.httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          toaster.error("Session expired or invalid");
          localStorage.clear();
          this.autoLogout?.();
        }
        return Promise.reject(error);
      }
    );
  }

  // Optional: implement autoLogout if needed
  autoLogout() {
    // You can add logic here to redirect to login or dispatch a logout action
    window.location.href = "/login"; // Example: redirect to login
  }
}
