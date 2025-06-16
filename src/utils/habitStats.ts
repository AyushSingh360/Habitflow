import { HabitEntry, HabitStats } from '../types/habit';
import { format, subDays, parseISO, differenceInDays } from 'date-fns';

export const calculateHabitStats = (entries: HabitEntry[]): HabitStats => {
  if (entries.length === 0) {
    return {
      habitId: '',
      currentStreak: 0,
      longestStreak: 0,
      totalCompletions: 0,
      completionRate: 0,
    };
  }

  const habitId = entries[0].habitId;
  const completedEntries = entries.filter(entry => entry.completed);
  const totalCompletions = completedEntries.length;

  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  
  // Calculate current streak
  let currentStreak = 0;
  const today = format(new Date(), 'yyyy-MM-dd');
  let checkDate = today;
  
  for (let i = 0; i < 365; i++) { // Check up to a year back
    const entry = sortedEntries.find(e => e.date === checkDate);
    if (entry && entry.completed) {
      currentStreak++;
    } else if (checkDate === today) {
      // If today is not completed, check yesterday
      checkDate = format(subDays(new Date(), 1), 'yyyy-MM-dd');
      const yesterdayEntry = sortedEntries.find(e => e.date === checkDate);
      if (yesterdayEntry && yesterdayEntry.completed) {
        currentStreak++;
      } else {
        break;
      }
    } else {
      break;
    }
    checkDate = format(subDays(parseISO(checkDate), 1), 'yyyy-MM-dd');
  }

  // Calculate longest streak
  let longestStreak = 0;
  let tempStreak = 0;
  const allDates = sortedEntries.map(e => e.date).sort();
  
  for (let i = 0; i < allDates.length; i++) {
    const entry = entries.find(e => e.date === allDates[i]);
    if (entry && entry.completed) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  // Calculate completion rate (last 30 days)
  const thirtyDaysAgo = format(subDays(new Date(), 30), 'yyyy-MM-dd');
  const recentEntries = entries.filter(entry => entry.date >= thirtyDaysAgo);
  const recentCompletions = recentEntries.filter(entry => entry.completed).length;
  const completionRate = recentEntries.length > 0 ? (recentCompletions / recentEntries.length) * 100 : 0;

  // Last completed date
  const lastCompletedEntry = completedEntries
    .sort((a, b) => b.date.localeCompare(a.date))[0];
  const lastCompleted = lastCompletedEntry ? parseISO(lastCompletedEntry.date) : undefined;

  return {
    habitId,
    currentStreak,
    longestStreak,
    totalCompletions,
    completionRate: Math.round(completionRate),
    lastCompleted,
  };
};