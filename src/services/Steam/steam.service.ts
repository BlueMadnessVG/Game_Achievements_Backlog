import type { GameAchievementsResponse, UserGamesResponse } from "../../models/api";
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
    },

    async getGamesAchievements(steamId: string, appIds: number[]) {
        const promises = appIds.map( appId => 
            this.getGameAchievements(steamId, appId)
         );

         const result = await Promise.allSettled(promises);

         return result.map((result, index) => ({
            appId: appIds[index],
            success: result.status === 'fulfilled',
            data: result.status === 'fulfilled' ? result.value : null,
            error: result.status === 'rejected' ? result.reason : null
         }));
    },

    async getUserProfile(steamId: string) {
        return apiClient.get(`/api/steam/user/${steamId}/profile`);
    }
}