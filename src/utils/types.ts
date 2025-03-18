
export type Platform = 'leetcode' | 'gfg' | 'codeforces' | 'custom';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  title: string;
  link: string;
  platform: Platform;
  difficulty: DifficultyLevel;
  tags: string[];
  completed: boolean;
  notes?: string;
  lastAttempted?: Date;
}

export interface CustomSheet {
  id: string;
  title: string;
  description: string;
  questions: string[]; // Array of question IDs
  createdAt: Date;
  updatedAt: Date;
  progress: number; // Percentage of completed questions
}

export interface Contest {
  id: string;
  title: string;
  platform: Platform;
  startTime: Date;
  endTime: Date;
  link: string;
  registered: boolean;
}

export interface UserProgress {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  byPlatform: {
    leetcode: number;
    gfg: number;
    codeforces: number;
    custom: number;
  };
  streakDays: number;
  lastActive: Date;
}
