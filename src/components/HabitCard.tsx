import React, { useState } from 'react';
import { Check, Flame, Calendar, TrendingUp, Edit3, Trash2 } from 'lucide-react';
import { Habit, HabitStats } from '../types/habit';
import { format } from 'date-fns';
import RippleButton from './RippleButton';
import ConfettiEffect from './ConfettiEffect';

interface HabitCardProps {
  habit: Habit;
  stats: HabitStats;
  isCompletedToday: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ 
  habit, 
  stats, 
  isCompletedToday, 
  onToggle, 
  onEdit,
  onDelete
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    if (!isCompletedToday) {
      setShowConfetti(true);
    }
    onToggle();
  };

  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 dark:border-gray-700 animate-slideUp relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <ConfettiEffect trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-3">
          <div 
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform transition-all duration-300 ${
              stats.currentStreak > 0 ? 'animate-streak-fire' : ''
            } ${isHovered ? 'scale-110' : ''}`}
            style={{ backgroundColor: habit.color }}
          >
            {habit.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
              {habit.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              {habit.category}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <RippleButton
            onClick={handleToggle}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isCompletedToday
                ? 'bg-green-500 text-white shadow-lg animate-heartbeat'
                : 'border-2 border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
            }`}
          >
            {isCompletedToday && <Check size={16} />}
          </RippleButton>
          
          {/* Action Buttons - Show on Hover */}
          <div className={`flex space-x-1 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <RippleButton
              onClick={onEdit}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
            >
              <Edit3 size={14} />
            </RippleButton>
            <RippleButton
              onClick={onDelete}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            >
              <Trash2 size={14} />
            </RippleButton>
          </div>
        </div>
      </div>

      {habit.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300 animate-fadeIn">
          {habit.description}
        </p>
      )}

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center group/stat">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Flame className={`text-orange-500 transition-all duration-300 ${stats.currentStreak > 0 ? 'animate-wiggle' : ''} group-hover/stat:scale-110`} size={16} />
            <span className="text-lg font-bold text-gray-900 dark:text-white transition-all duration-300 group-hover/stat:scale-110">
              {stats.currentStreak}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">Current</p>
        </div>
        
        <div className="text-center group/stat">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <TrendingUp className="text-blue-500 transition-all duration-300 group-hover/stat:scale-110" size={16} />
            <span className="text-lg font-bold text-gray-900 dark:text-white transition-all duration-300 group-hover/stat:scale-110">
              {stats.longestStreak}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">Best</p>
        </div>
        
        <div className="text-center group/stat">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Calendar className="text-purple-500 transition-all duration-300 group-hover/stat:scale-110" size={16} />
            <span className="text-lg font-bold text-gray-900 dark:text-white transition-all duration-300 group-hover/stat:scale-110">
              {stats.completionRate}%
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">Rate</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
          <div
            className="h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${stats.completionRate}%`,
              backgroundColor: habit.color
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 transition-colors duration-300">
        <div>
          {stats.lastCompleted ? (
            `Last: ${format(stats.lastCompleted, 'MMM d')}`
          ) : (
            'Not completed yet'
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span>{stats.totalCompletions} total</span>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;