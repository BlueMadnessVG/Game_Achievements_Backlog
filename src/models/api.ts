import type { Game } from "./Game.model";

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