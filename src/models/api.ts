import type { Achievement, Game } from "./Game.model";

export interface BaseResponse { 
    success: boolean;
    data: unknown;
    metadata: {
        timestamp: string;
        version: string;
        source?: string;
        [key: string]: unknown;
    }
}

export interface ErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
        timestamp: string;
    }
}

export interface SuccessResponse<T = unknown> {
    success: true;
    data: T;
    metadata: {
        timestamp: string;
        version: string;
        source?: string;
        [key: string]: unknown;
    }
}

export interface UserGameData {
    games: Game[];
    totalCount: number;
    totalPlaytime: number
}

export type UserGamesResponse = SuccessResponse<UserGameData>;

export interface GameAchievementsData {
    achievements: Achievement[];
    summary: {
        total: number;
        unlocked: number;
        percentage: number;
    }
}

export type GameAchievementsResponse = SuccessResponse<GameAchievementsData>;

export interface PaginationMetadata {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface GetUserGamesParams extends PaginationParams {
    includeAchievements?: boolean;
    platform?: string;
}