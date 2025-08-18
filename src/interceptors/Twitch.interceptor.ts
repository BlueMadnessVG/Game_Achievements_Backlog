import type { InternalAxiosRequestConfig } from "axios";
import { apiTwitch } from "../services/apiEndpoints";
import { SnackbarUtilities } from "../utils/controllers/snackbar.manager";
import { getValidationError } from "../utils/controllers/validation.error";

/**
 * Configures Axios interceptors for the Twitch API client.
 *
 * Logs all outgoing requests and incoming responses for debugging purposes.
 * Handles request and response errors, showing user-friendly error messages
 * for known error codes via `SnackbarUtilities`.
 *
 * @function
 * @returns {void}
 *
 * @remarks
 * - Canceled requests (error code "ERR_CANCELED") are logged but not shown as user errors.
 * - Other errors trigger a user notification with a validation error message.
 */
export const TwitchAuthInterceptor = (): void => {
  apiTwitch.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    console.log("Request made to Twitch API", request);
    return request;
  });

  apiTwitch.interceptors.response.use(
    (response) => {
      console.log("Response from Twitch API", response);
      return response;
    },
    (error) => {
      console.log("Error in response from Twitch API", error);

      if (error.code === "ERR_CANCELED") {
        console.log("Request canceled", error);
        return Promise.reject(error);
      }

      SnackbarUtilities.error(getValidationError(error.code));
      return Promise.reject(error);
    }
  );
};
