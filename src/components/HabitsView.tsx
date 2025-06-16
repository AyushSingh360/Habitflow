import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Target, TrendingUp, Award, Zap } from 'lucide-react';
import { useHabits } from '../hooks/useHabits';
import { getEntry } from '../utils/database';
import HabitCard from './HabitCard';
import HabitForm from './HabitForm';
import RippleButton from './RippleButton';
import AnimatedBackground from './AnimatedBackground';
import { format } from 'date-fns';
import { Habit } from '../types/habit';

const HabitsView: React.FC = () => {
  const { habits, habitStats, loading, addHabit, updateHabit, deleteHabit, toggleHabitCompletion } = useHabits();
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>();
  const [completedToday, setCompletedToday] = useState<Set<string>>(new Set());
  const [motivationalQuote, setMotivationalQuote] = useState('');

  const today = format(new Date(), 'yyyy-MM-dd');

  const quotes = [
    "Success is the sum of small efforts repeated day in and day out.",
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    "The secret of getting ahead is getting started.",
    "Your future is created by what you do today, not tomorrow.",
    "Small daily improvements over time lead to stunning results.",
    "Discipline is choosing between what you want now and what you want most.",
    "The best time to plant a tree was 20 years ago. The second best time is now."
  ];

  useEffect(() => {
    setMotivationalQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    const loadTodayCompletions = async () => {
      const completed = new Set<string>();
      for (const habit of habits) {
        const entry = await getEntry(habit.id, today);
        if (entry?.completed) {
          completed.add(habit.id);
        }
      }
      setCompletedToday(completed);
    };

    if (habits.length > 0) {
      loadTodayCompletions();
    }
  }, [habits, today]);

  const handleToggleHabit = async (habitId: string) => {
    await toggleHabitCompletion(habitId);
    
    const newCompleted = new Set(completedToday);
    if (newCompleted.has(habitId)) {
      newCompleted.delete(habitId);
    } else {
      newCompleted.add(habitId);
    }
    setCompletedToday(newCompleted);
  };

  const handleSaveHabit = async (habitData: Omit<Habit, 'id' | 'createdAt'>) => {
    if (editingHabit) {
      await updateHabit({ ...editingHabit, ...habitData });
    } else {
      await addHabit(habitData);
    }
    setShowForm(false);
    setEditingHabit(undefined);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  };

  const handleDeleteHabit = async (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (habit && window.confirm(`Are you sure you want to delete "${habit.name}"?`)) {
      await deleteHabit(habitId);
    }
  };

  const completedTodayCount = completedToday.size;
  const totalHabits = habits.length;
  const completionPercentage = totalHabits > 0 ? (completedTodayCount / totalHabits) * 100 : 0;

  // Calculate streak stats
  const totalCurrentStreak = Array.from(habitStats.values()).reduce((sum, stats) => sum + stats.currentStreak, 0);
  const bestStreak = Math.max(...Array.from(habitStats.values()).map(stats => stats.longestStreak), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-gray-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Motivational Quote */}
        <div className="mb-6 text-center animate-fadeIn">
          <p className="text-lg italic text-gray-600 dark:text-gray-400 transition-colors duration-300">
            "{motivationalQuote}"
          </p>
        </div>

        {/* Header Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="animate-slideRight">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Today's Habits
              </h1>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 mt-2">
                {format(new Date(), 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
            
            <div className="animate-slideLeft">
              <RippleButton
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 group animate-glow"
              >
                <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-semibold">Add Habit</span>
              </RippleButton>
            </div>
          </div>

          {/* Enhanced Progress Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Progress Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300 animate-slideUp shadow-xl hover:shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-2xl flex items-center justify-center animate-float">
                    <Calendar className="text-white dark:text-black" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                      Daily Progress
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      {completedTodayCount} of {totalHabits} habits completed
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-5xl font-bold text-gray-900 dark:text-white transition-colors duration-300 animate-heartbeat">
                    {Math.round(completionPercentage)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    Completion Rate
                  </div>
                </div>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 transition-colors duration-300 overflow-hidden">
                  <div
                    className="h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{ 
                      width: `${completionPercentage}%`,
                      background: completionPercentage === 100 
                        ? 'linear-gradient(90deg, #10B981, #059669)' 
                        : 'linear-gradient(90deg, #000000, #374151)'
                    }}
                  >
                    <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-30" />
                  </div>
                </div>
                {completionPercentage === 100 && (
                  <div className="absolute -top-2 right-0 animate-bounce-gentle">
                    <Award className="text-yellow-500" size={24} />
                  </div>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-700 animate-slideDown">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center animate-wiggle">
                    <Zap className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-orange-600 dark:text-orange-400">Total Streak</p>
                    <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                      {totalCurrentStreak}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700 animate-slideDown" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center animate-bounce-gentle">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Best Streak</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      {bestStreak}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Habits Grid */}
        {habits.length === 0 ? (
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-8 transition-colors duration-300 animate-float">
              <Target size={48} className="text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Ready to build amazing habits?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto transition-colors duration-300">
              Start your journey to a better you. Create your first habit and begin building positive routines that last.
            </p>
            <RippleButton
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 animate-glow"
            >
              Create Your First Habit
            </RippleButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {habits.map((habit, index) => (
              <div
                key={habit.id}
                className="animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <HabitCard
                  habit={habit}
                  stats={habitStats.get(habit.id) || {
                    habitId: habit.id,
                    currentStreak: 0,
                    longestStreak: 0,
                    totalCompletions: 0,
                    completionRate: 0,
                  }}
                  isCompletedToday={completedToday.has(habit.id)}
                  onToggle={() => handleToggleHabit(habit.id)}
                  onEdit={() => handleEditHabit(habit)}
                  onDelete={() => handleDeleteHabit(habit.id)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Habit Form Modal */}
        {showForm && (
          <HabitForm
            habit={editingHabit}
            onSave={handleSaveHabit}
            onCancel={() => {
              setShowForm(false);
              setEditingHabit(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HabitsView;