import type { Game, GameCardModel } from "../../models";
import { fuzzyMatch } from "../../utils/helpers/GameServces.helper";
import { igdbClient } from "../api/IGDB";
import { apiIGDB } from "../apiEndpoints";
import { IGDBService } from "./IGDB.service";

/**
 * Games Section
 */
export const gamesServices = {
  async enrichGamesWithMetadata(steamGames: Game[]) {
    try {
      const gameNames = steamGames.map((game) => game.name);
      const igdbGames = await IGDBService.searchGames({
        search: gameNames[0],
        limit: 10,
      });

      return steamGames.map((steamGame) => {
        const igdbGame = igdbGames.find((igdb) =>
          fuzzyMatch(igdb.name, steamGame.name)
        );

        return {
          ...steamGame,
          metadata: igdbGame
            ? {
                summary: igdbGame.summary,
                coverUrl: igdbGame.cover?.url,
                rating: igdbGame.rating,
                releaseDate: igdbGame.first_release_date,
                platforms: igdbGame.platforms,
              }
            : null,
        };
      });
    } catch (error) {
      console.warn("Failed to enrich games with IGDB metadata:", error);
      return steamGames;
    }
  },
};
