import axios, { AxiosError, type AxiosInstance } from "axios";
import { getLocalStorage, getValidationError, SnackbarUtilities } from "../../utils";

class IGDBClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_IGDB_AWS_API_URL,
      timeout: 10000,
      headers: {
        "x-api-key": import.meta.env.VITE_AWS_API_KEY,
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = getLocalStorage("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        console.log(`🚀 IGDB ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log(
          `✅ IGDB Response ${response.status} ${response.config.url}`
        );
        return response;
      },
      (error: AxiosError) => {
        this.handleError(error);
        return Promise.reject(this.transformError(error));
      }
    );
  }

  private handleError(error: AxiosError) {
    if (error.code !== "ERR_CANCELED") {
        const key = error.code ?? error.response?.status ?? "";
        const userMessage = getValidationError(key);
        SnackbarUtilities.error(userMessage);
    }
  }

  private transformError(error: AxiosError) {
    return {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        timestamp: new Date().toISOString()
    }
  }
}

export const igdbClient = new IGDBClient();
