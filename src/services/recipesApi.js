import { BaseService } from "./baseService";

export class RecipeService extends BaseService {
  async createRecipes(payload) {
    try {
      const response = await this.httpClient.post("/recipes", payload);
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

  getRecipeById(_id) {
    return fetch(`/api/recipes/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (res) => {
      const contentType = res.headers.get("Content-Type");

      if (!res.ok) {
        // If response is not OK, try to get JSON or return plain status
        let errorData;
        if (contentType && contentType.includes("application/json")) {
          errorData = await res.json();
        }
        return { status: res.status, error: errorData || "Something went wrong" };
      }

      // If it's OK and JSON, parse it
      const data = await res.json();
      return { status: res.status, data };
    });
  }


  async getAllRecipes() {
    try {
      const response = await this.httpClient.get("/recipes");
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

  async getUserRecipes(userId) {
    try {
      const response = await this.httpClient.get(`recipes/my?userId=${userId}`);
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


  async deleteRecipes(id) {
    try {
      const response = await this.httpClient.delete(`recipes/my?id=${id}`);
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


  async addRating(id, value) {
    try {
      const response = await this.httpClient.post(`recipes/rate?id=${id}`, { value: value });
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

  async addComment(id, value, userId) {
    try {
      const response = await this.httpClient.post(`recipes/comment`, { text: value, userId: userId, id: id });
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

  async getRatecomments(id, userId) {
    try {
      const response = await this.httpClient.post(`recipes/reviews`, { userId: userId, id: id });
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
