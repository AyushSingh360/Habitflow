import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Habit, HabitEntry } from '../types/habit';

interface HabitTrackerDB extends DBSchema {
  habits: {
    key: string;
    value: Habit;
  };
  entries: {
    key: string;
    value: HabitEntry;
    indexes: {
      'by-habit': string;
      'by-date': string;
      'by-habit-date': [string, string];
    };
  };
}

let db: IDBPDatabase<HabitTrackerDB>;

export const initDB = async (): Promise<IDBPDatabase<HabitTrackerDB>> => {
  if (db) return db;

  db = await openDB<HabitTrackerDB>('HabitTrackerDB', 1, {
    upgrade(db) {
      // Create habits store
      const habitStore = db.createObjectStore('habits', {
        keyPath: 'id',
      });

      // Create entries store
      const entryStore = db.createObjectStore('entries', {
        keyPath: 'id',
      });

      // Create indexes for efficient querying
      entryStore.createIndex('by-habit', 'habitId');
      entryStore.createIndex('by-date', 'date');
      entryStore.createIndex('by-habit-date', ['habitId', 'date'], { unique: true });
    },
  });

  return db;
};

// Habit operations
export const addHabit = async (habit: Habit): Promise<void> => {
  const database = await initDB();
  await database.add('habits', habit);
};

export const updateHabit = async (habit: Habit): Promise<void> => {
  const database = await initDB();
  await database.put('habits', habit);
};

export const deleteHabit = async (habitId: string): Promise<void> => {
  const database = await initDB();
  const tx = database.transaction(['habits', 'entries'], 'readwrite');
  
  // Delete habit
  await tx.objectStore('habits').delete(habitId);
  
  // Delete all entries for this habit
  const entries = await tx.objectStore('entries').index('by-habit').getAllKeys(habitId);
  for (const key of entries) {
    await tx.objectStore('entries').delete(key);
  }
  
  await tx.done;
};

export const getAllHabits = async (): Promise<Habit[]> => {
  const database = await initDB();
  return await database.getAll('habits');
};

export const getHabit = async (habitId: string): Promise<Habit | undefined> => {
  const database = await initDB();
  return await database.get('habits', habitId);
};

// Entry operations
export const addEntry = async (entry: HabitEntry): Promise<void> => {
  const database = await initDB();
  await database.put('entries', entry);
};

export const getEntry = async (habitId: string, date: string): Promise<HabitEntry | undefined> => {
  const database = await initDB();
  return await database.getFromIndex('entries', 'by-habit-date', [habitId, date]);
};

export const getEntriesForHabit = async (habitId: string): Promise<HabitEntry[]> => {
  const database = await initDB();
  return await database.getAllFromIndex('entries', 'by-habit', habitId);
};

export const getEntriesForDate = async (date: string): Promise<HabitEntry[]> => {
  const database = await initDB();
  return await database.getAllFromIndex('entries', 'by-date', date);
};

export const getEntriesInRange = async (habitId: string, startDate: string, endDate: string): Promise<HabitEntry[]> => {
  const database = await initDB();
  const allEntries = await database.getAllFromIndex('entries', 'by-habit', habitId);
  
  return allEntries.filter(entry => 
    entry.date >= startDate && entry.date <= endDate
  );
};