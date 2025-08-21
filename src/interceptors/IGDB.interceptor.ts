import { apiIGDB } from "../services/apiEndpoints";
import { getLocalStorage } from "../utils";
import { SnackbarUtilities } from "../utils/controllers/snackbar.manager";
import { getValidationError } from "../utils/controllers/validation.error";
import type { InternalAxiosRequestConfig } from "axios";

/**
 * Configures Axios interceptors for the IGDB API client.
 *
 * Adds authentication and API key headers to each outgoing request if available,
 * and logs request details for debugging purposes.
 * Handles request errors, displaying user-friendly messages for known error codes.
 *
 * @function
 * @returns {void}
 *
 * @remarks
 * - Retrieves the access token from localStorage using the key `"YouTube_token"`.
 * - Retrieves the IGDB API key from environment variables (`VITE_IGDB_API_KEY`).
 * - Displays error notifications via `SnackbarUtilities` for non-canceled requests.
 */

export const AxiosInterceptor = () => {
  /**
   * Updates the request headers with authentication and API key information if available.
   *
   * @param {InternalAxiosRequestConfig} request - The Axios request configuration.
   * @returns {InternalAxiosRequestConfig} The updated request configuration.
   */
  const updateHeaders = (request: InternalAxiosRequestConfig) => {
    const token = getLocalStorage("twitch_token");
    const clientID = import.meta.env.VITE_TWITCH_CLIENT_ID;

    request.headers = {
      ...(request.headers ?? {}),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(clientID && { "Client-ID": clientID }),
    };

    return request;
  };

  apiIGDB.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    console.log("Request made to IGDB API", request);
    return updateHeaders(request);
  });

  apiIGDB.interceptors.request.use(
    (response) => {
      console.log("Request made to IGDB API", response);
      return response;
    },
    (error) => {
      console.log("Error in request to IGDB API", error);

      if (error.code === "ERR_CANCELED") {
        console.log("Request was canceled", error);
        return Promise.reject(error);
      }

      SnackbarUtilities.error(getValidationError(error.code));
      return Promise.reject(error);
    }
  );
};
