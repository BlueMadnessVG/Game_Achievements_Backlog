import type {
  Achievement,
  Game,
  GameStats,
  IGDBGame,
  SteamAchievement,
} from "../../models";

export const getCoverImageUrl = (
  imageId: string,
  size: "cover_big" | "cover_small" | "720p" = "cover_big"
): string => {
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;
};

export const getScreenshotUrl = (imageId: string): string => {
  return `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${imageId}.jpg`;
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString("es-Us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const processIGDBGame = (igdbGame: IGDBGame): Game => {
  const coverImage = igdbGame.cover
    ? getCoverImageUrl(igdbGame.cover.image_id)
    : "/images/default-game-cover.jpg";

  const description =
    igdbGame.storyline || igdbGame.summary || "No description available.";

  const platform = igdbGame.platforms?.[0]?.name || "Unknown Platform";

  const releaseDate = igdbGame.first_release_date
    ? formatDate(igdbGame.first_release_date)
    : "Unknown Release Date";

  const companies = igdbGame.involved_companies || [];
  const developers = companies
    .filter((company) => company.developer)
    .map((company) => company.company.name);
  const publishers = companies
    .filter((company) => company.publisher)
    .map((company) => company.company.name);

  const developer = developers[0] || "Unknown Developer";
  const publisher = publishers[0] || "Unknown Publisher";

  const genres = igdbGame.genres?.map((genre) => genre.name) || [];
  const gameModes = igdbGame.game_modes?.map((mode) => mode.name) || [];

  const screenshots =
    igdbGame.screenshots?.map((screenshot) =>
      getScreenshotUrl(screenshot.image_id)
    ) || [];

  const trailers =
    igdbGame.videos?.map(
      (video) => `https://www.youtube.com/watch?v=${video.video_id}`
    ) || [];

  const officialWebsite = igdbGame.websites?.find(
    (website) => website.category === 1
  )?.url;

  return {
    id: igdbGame.id,
    title: igdbGame.name,
    coverImage,
    description,
    platform,
    releaseDate,
    developer,
    publisher,
    genres,
    rating: igdbGame.total_rating,
    ratingCount: igdbGame.total_rating_count,
    gameModes,
    website: officialWebsite,
    screenshots,
    trailers,
  };
};

export const processSteamAchievements = (
  steamAchievements: SteamAchievement[]
): Achievement[] => {
  return steamAchievements.map((steamAchievement) => {
    const unlockRate = steamAchievement.globalAchievedRate || 0;
    let rarity: "Common" | "Rare" | "Epic" | "Legendary";

    if (unlockRate >= 50) rarity = "Common";
    else if (unlockRate >= 20) rarity = "Rare";
    else if (unlockRate >= 5) rarity = "Epic";
    else rarity = "Legendary";

    const points = {
      Common: 10,
      Rare: 30,
      Epic: 75,
      Legendary: 150,
    }[rarity];

    return {
      id: steamAchievement.apiName,
      name: steamAchievement.displayName || steamAchievement.name,
      description: steamAchievement.description,
      icon: steamAchievement.achieved
        ? steamAchievement.icon
        : steamAchievement.iconGray,
      unlocked: steamAchievement.achieved === 1,
      unlockDate: steamAchievement.unlockTime
        ? formatDate(steamAchievement.unlockTime)
        : undefined,
      rarity,
      points,
      globalUnlockRate: steamAchievement.globalAchievedRate,
      hidden: steamAchievement.hidden === 1,
    };
  });
};

export const calculateGameStats = (
  achievements: Achievement[],
  steamPlaytime?: number
): GameStats => {
  const unlockedAchievements = achievements.filter((ach) => ach.unlocked);
  const totalAchievements = achievements.length;
  const completionPercentage =
    totalAchievements > 0
      ? Math.round((unlockedAchievements.length / totalAchievements) * 100)
      : 0;

  const totalPlayTime = steamPlaytime
    ? `${Math.round(steamPlaytime / 60)} hours`
    : "Unknown";

  return {
    totalPlayTime,
    completionPercentage,
    achievementsUnlocked: unlockedAchievements.length,
    totalAchievements,
    lastPlayed: "Recently",
    currentProgress: `${unlockedAchievements.length}/${totalAchievements} achievements`,
    steamStats: steamPlaytime
      ? {
          playtime_forever: steamPlaytime,
          achievementsUnlocked: unlockedAchievements.length,
          totalAchievements,
        }
      : undefined,
  };
};
