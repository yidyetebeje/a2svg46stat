export interface CodeforceUserRes {
    status: string;
    result: Result[];
}
export interface Result {
    rating: number;
    rank: string;
    maxRating: number;
    maxRank: string;
    handle: string;
    avatar: string;
    titlePhoto: string;
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    organization: string;
    contribution: number;
    rankColor: string;
    lastOnlineTimeSeconds: number;
    registrationTimeSeconds: number;
    friendOfCount: number;
    avatarFull: string;
    email: string;
    lastOnlineTimeSecondsStr: string;
    registrationTimeSecondsStr: string;
    lastOnlineTime: string;
    registrationTime: string;
    maxRankColor: string;
    maxRankName: string;
}