import { apiClient } from "../api/client"

export const steamService = {
    async getUserGames(steamId: string, includeAchievements?: boolean) {
        return apiClient.get<UserGamesResponse>(
            `/api/steam/user/${steamId}/games`,
            { includeAchievements }
        )
    },

    async getGameAchievements(steamId: string, appId: number) {
        return apiClient.get<GameAchievementsResponse>(
            `/api/steam/user/${steamId}/games/${appId}/achievements`
        )
    }

    async getUserProfile(steamId: string) {
        return apiClient.get(`/api/steam/user/${steamId}/profile`);
    }
}