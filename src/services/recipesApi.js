import { BaseService } from "./baseService";

export class RecipeService extends BaseService {
  async createRecipes(payload) {
    try {
      const response = await this.httpClient.post("/recipes", payload );
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


  async getAllRecipes() {
    try {
      const response = await this.httpClient.get("/recipes" );
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
