export interface IGDBGame {
  id: number;
  name: string;
  summary?: string;
  storyline?: string;
  first_release_date?: number;
  platforms?: number[];
  cover?: IGDBCover;
  screenshots?: IGDBImage[];
  videos?: any[];
  rating?: number;
  total_rating?: number;
  genres?: { id: number; name: string }[];
  involved_companies?: {
    company: { id: number; name: string };
  }[];
}

export interface IGDBCover {
  id: number;
  game: number;
  image_id: string;
  url: string;
}

export interface IGDBPlatform {
  id: number;
  name: string;
  abbreviation?: string;
  platform_logo?: IGDBImage;
}

export interface IGDBImage {
  id: number;
  image_id: string;
  url: string;
}