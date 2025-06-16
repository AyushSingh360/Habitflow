import { useState, useEffect } from 'react';
import { Habit, HabitEntry, HabitStats } from '../types/habit';
import { 
  getAllHabits, 
  addHabit as dbAddHabit, 
  updateHabit as dbUpdateHabit, 
  deleteHabit as dbDeleteHabit,
  getEntriesForHabit,
  addEntry,
  getEntry
} from '../utils/database';
import { calculateHabitStats } from '../utils/habitStats';
import { format } from 'date-fns';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitStats, setHabitStats] = useState<Map<string, HabitStats>>(new Map());
  const [loading, setLoading] = useState(true);

  const loadHabits = async () => {
    try {
      const allHabits = await getAllHabits();
      setHabits(allHabits);
      
      // Load stats for each habit
      const statsMap = new Map<string, HabitStats>();
      for (const habit of allHabits) {
        const entries = await getEntriesForHabit(habit.id);
        const stats = calculateHabitStats(entries);
        statsMap.set(habit.id, stats);
      }
      setHabitStats(statsMap);
    } catch (error) {
      console.error('Error loading habits:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const addHabit = async (habit: Omit<Habit, 'id' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    
    await dbAddHabit(newHabit);
    await loadHabits();
  };

  const updateHabit = async (habit: Habit) => {
    await dbUpdateHabit(habit);
    await loadHabits();
  };

  const deleteHabit = async (habitId: string) => {
    await dbDeleteHabit(habitId);
    await loadHabits();
  };

  const toggleHabitCompletion = async (habitId: string, date?: string) => {
    const targetDate = date || format(new Date(), 'yyyy-MM-dd');
    const existingEntry = await getEntry(habitId, targetDate);
    
    const entry: HabitEntry = {
      id: existingEntry?.id || crypto.randomUUID(),
      habitId,
      date: targetDate,
      completed: !existingEntry?.completed,
      completedAt: !existingEntry?.completed ? new Date() : undefined,
    };

    await addEntry(entry);
    await loadHabits(); // Reload to update stats
  };

  return {
    habits,
    habitStats,
    loading,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    refreshHabits: loadHabits,
  };
};