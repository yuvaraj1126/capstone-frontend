import { BaseService } from "./baseService";

export class AuthService extends BaseService {
  async createUser(payload) {
    try {
      const response = await this.httpClient.post("/auth/register", payload );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        error: error?.response?.data || null,
        message: error?.response?.data?.message || "Unknown error",
        status: error?.response?.status || 500,
      };
    }
  }


  async loginUser(payload) {
    try {
      const response = await this.httpClient.post("/auth/login", payload );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        error: error?.response?.data || null,
        message: error?.response?.data?.message || "Unknown error",
        status: error?.response?.status || 500,
      };
    }
  }
}
