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
  baseURL: import.meta.env.VITE_IGDB_API_URL,
  timeout: Number(import.meta.env.VITE_IGDB_API_TIMEOUT) || 10000,
  withCredentials: true,
});

/**
 * Axios instance configured for the Twitch API.
 * 
 * @constant
 * @type {import("axios").AxiosInstance}
 * @remarks
 *  - `baseURL` is set from the environment variable `VITE_TWITCH_API_URL`.
 *  - `headers` include `Content-Type: application/x-www-form-urlencoded`.
 */
export const apiTwitch = axios.create({
  baseURL: import.meta.env.VITE_TWITCH_API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
