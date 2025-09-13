import { apiIGDB } from "../apiEndpoints";

/**
 * Games Section
 */
export const fetchGames = async (params: string) => {
  const response = await apiIGDB.post(
    "/games",
    params,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
  return response.data;
};

export const fetchUserGames = async (userId: number) => {};

export const fetchGameById = async (id: number) => {};

export const fetchGamesByIds = async (ids: number[]) => {};
