import { useEffect, useState } from "react";
import { fetchTwitchToken } from "../services/Twitch.service";
import { getLocalStorage } from "../utils";


interface Params {
    loading: boolean;
    token: string | null;
}


/**
 * Custom React hook to retrieve a Twitch API token.
 * 
 * Checks localStorage for an existing token and its expiry.
 * If the token is missing or expired, fetches a new token using `fetchTwitchToken`.
 * 
 * @function
 * @returns {Params} An Object containing:
 *  - `loading`: A boolean indicating if the token is being loaded.
 *  - `token`: The Twitch API token or null if not available.
 * 
 * @remarks
 *  - Token data is stored in localStorage under the key `twitch_token`.
 *  - Automatically handles token expiration and updates state when a new token is fetched.
 *  - Cleanup is performed using an AbortController to prevent memory leaks if the component unmounts.
 */
export const useGetTwitchToken = (): Params => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    const getToken = async () => {
      const tokenData = JSON.parse(
        getLocalStorage("twitch_token") ?? "null"
      );
      if (!tokenData || Date.now() > tokenData.expiry) {
        const data = await fetchTwitchToken();
        console.log("Fetched new Twitch token:", data);
        setToken(data.access_token);
      } else {
        setToken(tokenData.access_token);
      }
      setLoading(false);
    };

    getToken();

    return () => {
      controller.abort();
    };
  }, []);

  return { loading, token };
};
