import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar, Award, Target, Zap, Trophy, Star } from 'lucide-react';
import { useHabits } from '../hooks/useHabits';
import { getEntriesInRange } from '../utils/database';
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns';
import AnimatedBackground from './AnimatedBackground';
import RippleButton from './RippleButton';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsView: React.FC = () => {
  const { habits, habitStats } = useHabits();
  const [weeklyData, setWeeklyData] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  useEffect(() => {
    const loadAnalytics = async () => {
      if (habits.length === 0) return;

      // Weekly data (last 7 days)
      const weeklyCompletions = [];
      const labels = [];
      
      for (let i = 6; i >= 0; i--) {
        const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
        labels.push(format(subDays(new Date(), i), 'EEE'));
        
        let dayCompletions = 0;
        for (const habit of habits) {
          const entries = await getEntriesInRange(habit.id, date, date);
          if (entries.length > 0 && entries[0].completed) {
            dayCompletions++;
          }
        }
        weeklyCompletions.push(dayCompletions);
      }

      setWeeklyData({
        labels,
        datasets: [
          {
            label: 'Habits Completed',
            data: weeklyCompletions,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      });

      // Monthly trend data (last 30 days)
      const monthlyCompletions = [];
      const monthlyLabels = [];
      
      for (let i = 29; i >= 0; i--) {
        const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
        if (i % 5 === 0) {
          monthlyLabels.push(format(subDays(new Date(), i), 'MMM d'));
        } else {
          monthlyLabels.push('');
        }
        
        let dayCompletions = 0;
        for (const habit of habits) {
          const entries = await getEntriesInRange(habit.id, date, date);
          if (entries.length > 0 && entries[0].completed) {
            dayCompletions++;
          }
        }
        monthlyCompletions.push(dayCompletions);
      }

      setMonthlyData({
        labels: monthlyLabels,
        datasets: [
          {
            label: 'Daily Completions',
            data: monthlyCompletions,
            borderColor: 'rgba(0, 0, 0, 1)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            tension: 0.4,
            pointBackgroundColor: 'rgba(0, 0, 0, 1)',
            pointBorderColor: 'rgba(255, 255, 255, 1)',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      });
    };

    loadAnalytics();
  }, [habits]);

  const totalCompletions = Array.from(habitStats.values()).reduce(
    (sum, stats) => sum + stats.totalCompletions, 0
  );
  
  const averageStreak = habits.length > 0 
    ? Array.from(habitStats.values()).reduce((sum, stats) => sum + stats.currentStreak, 0) / habits.length
    : 0;

  const bestHabit = Array.from(habitStats.entries()).reduce(
    (best, [habitId, stats]) => 
      stats.currentStreak > (best?.stats.currentStreak || 0) 
        ? { habitId, stats } 
        : best,
    null as { habitId: string; stats: any } | null
  );

  const perfectDays = monthlyData?.datasets[0]?.data?.filter((count: number) => count === habits.length).length || 0;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: 'rgba(107, 114, 128, 0.8)',
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'rgba(107, 114, 128, 0.8)',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Analytics & Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 text-lg">
            Track your progress and discover patterns in your habits
          </p>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-blue-200 dark:border-blue-700 animate-slideUp">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center animate-float">
                <BarChart3 className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Habits</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                  {habits.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-green-200 dark:border-green-700 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center animate-bounce-gentle">
                <Award className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">Total Completions</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                  {totalCompletions}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-orange-200 dark:border-orange-700 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center animate-wiggle">
                <Zap className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">Avg Streak</p>
                <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">
                  {Math.round(averageStreak)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-purple-200 dark:border-purple-700 animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center animate-heartbeat">
                <Trophy className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Perfect Days</p>
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                  {perfectDays}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Period Selector */}
        <div className="flex justify-center mb-8 animate-slideDown">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
            <RippleButton
              onClick={() => setSelectedPeriod('week')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                selectedPeriod === 'week'
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              This Week
            </RippleButton>
            <RippleButton
              onClick={() => setSelectedPeriod('month')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                selectedPeriod === 'month'
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Last 30 Days
            </RippleButton>
          </div>
        </div>

        {/* Enhanced Charts */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-slideUp">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-lg flex items-center justify-center">
                {selectedPeriod === 'week' ? <BarChart3 className="text-white dark:text-black\" size={16} /> : <TrendingUp className="text-white dark:text-black" size={16} />}
              </div>
              <span>{selectedPeriod === 'week' ? 'This Week' : '30-Day Trend'}</span>
            </h3>
            <div className="h-80">
              {selectedPeriod === 'week' && weeklyData && (
                <Bar data={weeklyData} options={chartOptions} />
              )}
              {selectedPeriod === 'month' && monthlyData && (
                <Line data={monthlyData} options={chartOptions} />
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Habit Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-slideUp">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 transition-colors duration-300 flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-lg flex items-center justify-center">
              <Target className="text-white dark:text-black" size={16} />
            </div>
            <span>Habit Performance</span>
          </h3>
          
          {habits.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                <Star className="text-gray-400 dark:text-gray-600" size={32} />
              </div>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 text-lg">
                No habits to analyze yet. Create some habits to see your performance!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {habits.map((habit, index) => {
                const stats = habitStats.get(habit.id);
                if (!stats) return null;

                return (
                  <div 
                    key={habit.id} 
                    className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-600 animate-slideRight"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-lg animate-float"
                        style={{ 
                          backgroundColor: habit.color,
                          animationDelay: `${index * 0.2}s`
                        }}
                      >
                        {habit.icon}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white transition-colors duration-300 text-lg">
                          {habit.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                          {stats.totalCompletions} completions • {habit.category}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                          {stats.currentStreak}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300 font-medium">
                          Current
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                          {stats.longestStreak}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300 font-medium">
                          Best
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                          {stats.completionRate}%
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300 font-medium">
                          Rate
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;