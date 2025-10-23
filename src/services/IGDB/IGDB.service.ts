import type {
  IGDBCover,
  IGDBGame,
  IGDBPlatform,
} from "../../models/IGDB.model";
import { igdbClient } from "../api/IGDB";

export const IGDBService = {
  async getGame(searchTerm: string, limit: number = 10) {
    const query = `
        fields name, summary, first_release_date, platform, cover.*, rating, total_rating;
        search "${searchTerm}";
        limit ${limit};
        where version_parent = null & category = 0;
        `;

    return igdbClient.post<IGDBGame[]>("/games", query);
  },

  async getGameById(gameId: number) {
    const query = `
      fields name, summary, storyline, first_release_date, platforms, 
             cover.*, screenshots.*, videos.*, websites.*, 
             rating, total_rating, aggregated_rating, total_rating_count,
             genres.name, involved_companies.company.name, 
             game_modes.name, multiplayer_modes.*;
      where id = ${gameId};
    `;

    const games = await igdbClient.post<IGDBGame[]>("/games", query);
    return games[0];
  },

  async getGamesByIds(gameIds: number[]) {
    const query = `
      fields name, cover.*, platforms, first_release_date, rating;
      where id = (${gameIds.join(",")});
    `;

    return igdbClient.post<IGDBGame[]>("/games", query);
  },

  async getGameBySteamAppId(steamAppId: number) {
    const query = `
    fields *;
    where external_games.uid = "${steamAppId}" & external_games.category = 1;
    `

    const games = await igdbClient.post<IGDBGame[]>('/games', query);
    return games[0];
  },

  async getPlatforms() {
    const query = `
      fields name, platform_logo.*, abbreviation;
      where abbreviation != null;
      sort name asc;
    `;

    return igdbClient.post<IGDBPlatform[]>("/platforms", query);
  },

  async getCovers(gamesIds: number[]) {
    const query = `
    fields game, image_id, url;
    where game = (${gamesIds.join(",")});
    `;

    const covers = await igdbClient.post<IGDBCover[]>("/covers", query);

    return covers.reduce((map, cover) => {
      map[
        cover.game
      ] = `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`;

      return map;
    }, {} as Record<number, string>);
  },

  async searchGames(filters: {
    search?: string;
    platform?: number[];
    genres?: number[];
    year?: number;
    limit?: number;
  }) {
    const whereConditions = [];

    if (filters.search) {
      whereConditions.push(`name ~ *"${filters.search}"*`);
    }

    if (filters.platform?.length) {
      whereConditions.push(`platforms = (${filters.platform.join(",")})`);
    }

    if (filters.genres?.length) {
      whereConditions.push(`genres = (${filters.genres.join(",")})`);
    }

    if (filters.year) {
      whereConditions.push(`first_release_date >= ${
        new Date(filters.year, 0, 1).getTime() / 1000
      } 
                           & first_release_date < ${
                             new Date(filters.year + 1, 0, 1).getTime() / 1000
                           }`);
    }

    const query = `
      fields name, summary, first_release_date, platforms, cover.*, rating;
      where ${whereConditions.join(" & ")};
      limit ${filters.limit || 50};
      sort rating desc;
    `;

    return igdbClient.post<IGDBGame[]>("/games", query);
  },
};
