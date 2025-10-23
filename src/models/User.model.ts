export interface SteamUserProfile {
    steamId: string;
    username: string;
    avatar: {
        small: string;
        medium: string;
        large: string;
    }
    profileUrl: string;
}