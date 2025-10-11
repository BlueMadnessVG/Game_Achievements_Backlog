export interface IGDBGame {
  id: number;
  name: string;
  cover?: {
    id: number;
    image_id: string;
  };
  summary?: string;
  storyline?: string;
  platforms?: Array<{
    id: number;
    name: string;
  }>;
  first_release_date?: number;
  involved_companies?: Array<{
    id: number;
    company: {
      id: number;
      name: string;
    };
    developer: boolean;
    publisher: boolean;
  }>;
  genres?: Array<{
    id: number;
    name: string;
  }>;
  total_rating?: number;
  total_rating_count?: number;
  game_modes?: Array<{
    id: number;
    name: string;
  }>;
  websites?: Array<{
    id: number;
    url: string;
    category: number;
  }>;
  screenshots?: Array<{
    id: number;
    image_id: string;
  }>;
  videos?: Array<{
    id: number;
    video_id: string;
  }>;
}

export interface SteamAchievement {
  apiName: string;
  achieved: number;
  unlockTime?: number;
  name: string;
  description: string;
  icon: string;
  iconGray: string;
  displayName?: string;
  hidden?: number;
  globalAchievedRate?: number;
}

export interface SteamGameStats {
  gameName: string;
  gameVersion?: string;
  availableGameStats: {
    achievements: SteamAchievement[];
    stats?: Array<{
      name: string;
      defaultValue: number;
      displayName: string;
    }>;
  };
}

export interface Game {
  id: number;
  title: string;
  coverImage: string;
  description: string;
  platform: string;
  releaseDate: string;
  developer: string;
  publisher: string;
  genres: string[];
  rating?: number;
  ratingCount?: number;
  gameModes?: string[];
  website?: string;
  screenshots?: string[];
  trailers?: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockDate?: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  points: number;
  globalUnlockRate?: number;
  hidden: boolean;
}

export interface GameStats {
  totalPlayTime: string;
  completionPercentage: number;
  achievementsUnlocked: number;
  totalAchievements: number;
  lastPlayed: string;
  currentProgress: string;
  steamStats?: {
    playtime_forever: number;
    playtime_2weeks?: number;
    achievementsUnlocked: number;
    totalAchievements: number;
  };
}

export interface GameData {
    game: Game;
    stats: GameStats;
    achievements: Achievement[];
}
