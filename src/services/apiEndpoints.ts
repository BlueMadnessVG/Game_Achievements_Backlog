import axios from "axios";

/**
 * Axios instance configuration for the IGDB API.
 * 
 * @constant
 * @type {import("axios").AxiosInstance}
 * @remarks
 *  - `baseURL` is set form the environment variable `VITE_IGDB_API_URL`
 *  - `timeout` is set fro `VITE_IGDB_API_TIMEOUT` or default to 10 seconds.
 *  - `withCredential` is enabled to allow sending cookies with requests.
 */
export const apiIGDB = axios.create({
  baseURL: import.meta.env.VITE_IGDB_AWS_API_URL,
  
    headers: {
      "x-api-key": import.meta.env.VITE_AWS_API_KEY,
    },
});