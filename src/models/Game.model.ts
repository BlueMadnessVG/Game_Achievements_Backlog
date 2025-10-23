export interface Game {
  appId: number;
  name: string;
  playtime: {
    total: number;
    twoWeeks?: number;
  };
  iconUrl?: string;
  coverUrl?: string;
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
