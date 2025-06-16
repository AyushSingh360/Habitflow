export interface Habit {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  createdAt: Date;
  targetDays?: number[];
  reminderTime?: string;
  category: string;
}

export interface HabitEntry {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
  notes?: string;
  completedAt?: Date;
}

export interface HabitStats {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate: number;
  lastCompleted?: Date;
}