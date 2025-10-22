import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from "axios";

class APIClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.client.interceptors.request.use(
            (config) => {
                console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.client.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                console.error('API Error:', error.response?.data);
                return Promise.reject(error);
            }
        );
    }

    async get<T>(url: string, params?: any): Promise<T> {
        const response = await this.client.post<T>(url, { params });
        return response.data;
    }

    async post<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.post<T>(url, data);
        return response.data;
    }
}

export const apiClient = new APIClient;