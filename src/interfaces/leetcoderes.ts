import { user } from './user';
export interface leetcoderes {
    Name?: string;
    Email?: string;
    easy?: number;
    easysub?: number;
    medium?: number;
    mediumsub?: number;
    hard?: number;
    hardsub?: number;
    total?: number;
    totalsub?: number;
    currentStreak?: number;
    totalActiveDays?: number;
    submissionCalendar?: calendar[];
    username?: string; 
}
interface calendar {
    date: string;
    count: number;
}