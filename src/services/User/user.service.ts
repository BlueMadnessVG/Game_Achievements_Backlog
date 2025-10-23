import type { SteamUserProfile } from "../../models";
import { steamService } from "../Steam/steam.service";

export const userService = {
  isValidSteamId(steamId: string): boolean {
    return /^\d{17}$/.test(steamId);
  },

  async getUserProfile(steamId: string): Promise<SteamUserProfile | null> {
    if (!this.isValidSteamId(steamId)) {
      throw new Error("Invalid Steam ID format");
    }

    try {
      //mock data
      return {
        steamId,
        username: `User${steamId.slice(-4)}`, // Placeholder
        avatar: {
          small: "",
          medium: "",
          large: "",
        },
        profileUrl: `https://steamcommunity.com/profiles/${steamId}`,
      };
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      return null;
    }
  },

  async getUserStats( steamId: string ) {
    const gameResponse = await steamService.getUserGames(steamId);

    if (!gameResponse.success) {
        throw new Error('Failed to fetch user games');
    }

    const games = gameResponse.data.games;
    const totalPlaytime = games.reduce((sum, game) => sum + game.playtime.total, 0);
    const averagePlaytime = games.length > 0 ? totalPlaytime / games.length : 0;

    return {
        totalGames: games.length,
        totalPlaytimeHours: Math.round(totalPlaytime / 60),
        averagePlaytimeHours: Math.round(averagePlaytime / 60),
        mostPlayedGame: games.reduce((prev, current) => (prev.playtime.total > current.playtime.total) ? prev : current)
    }
  }
};
