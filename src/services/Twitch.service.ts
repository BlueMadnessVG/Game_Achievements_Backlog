import { persistLocalStorage } from "../utils";
import { apiTwitch } from "./apiEndpoints";

const TOKEN_STORAGE_KEY = "twitch_token";

/**
 * Fetches a Twitch API OAuth token using client credential grand type.
 * 
 * Send a POST request to the Twitch OAuth2 endpoint with the client ID and client secret,
 * retrieves the access token and related information, and persists in the localStorage.
 * 
 * @async
 * @function
 * @returns {Promise<{ access_token: string, expires_in: number, token_type: string }>}
 *      A promise that resolves to the Twitch token data.
 * 
 * @remarks
 *  - The token is stored in the localStorage under the key `twitch_token`.
 *  - The stored object includes `access_token`, `token_type`, and `expiry` (calculated from current time = `expires_in`).
 */

export async function fetchTwitchToken() {
    const params = new URLSearchParams({
        client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
        client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
        grant_type: "client_credentials"
    });

    const response = await apiTwitch.post("/oauth2/token", params);
    const { access_token, expires_in, token_type } = response.data;

    persistLocalStorage(TOKEN_STORAGE_KEY, { access_token, token_type, expiry: Date.now() + expires_in * 1000 });
    return response.data
}