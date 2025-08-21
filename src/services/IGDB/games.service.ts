import { apiIGDB } from "../apiEndpoints"

/**
 * Games Section
 */
export const fetchGames = async () => {
 const response = await apiIGDB.post("/games", {' fields ': '*', 'limit': 10 });
 return response.data;
}

export const fetchUserGames = async (userId: number) => {

}

export const fetchGameById = async (id: number) => {

}

export const fetchGamesByIds = async (ids: number[]) => {

}
