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

export interface Game {
  appId: number;
  name: string;
  playtime: {
    total: number;
    twoWeeks?: number;
  };
  iconUrl?: string;
  headerUrl: string;
  hasCommunityVisibleStats: boolean;
  achievements?: Achievement[];
}

export interface Achievement {
  apiName: string;
  name: string;
  description: string;
  icon: {
    default: string;
    achieved: string;
  };
  globalPercentage: number;
  unlocked: boolean;
  unlockTime?: number;
  platform: Platform;
  hidden?: boolean;
  category?: string;
  points?: number;
}

export type Platform = 'steam' | 'epic' | 'playstation' | 'xbox' | 'nintendo';

export interface GameStats {
  totalGames: number;
  totalPlaytime: number;
  completedGames: number;
  averageCompletion: number;
  totalAchievements: number;
  platformBreakdown: Record<Platform, number>;
}

export interface TimelineAchievement extends Achievement {
  position: number;
  group?: string;
  milestone?: boolean;
}
