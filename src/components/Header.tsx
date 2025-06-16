import React from 'react';
import { Target, Settings, BarChart3, Sun, Moon, Zap } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import RippleButton from './RippleButton';

interface HeaderProps {
  currentView: 'habits' | 'analytics' | 'settings';
  onViewChange: (view: 'habits' | 'analytics' | 'settings') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4 animate-slideRight">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 animate-float shadow-lg">
                <Target className="text-white dark:text-black" size={24} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse">
                <Zap className="text-white w-3 h-3 m-0.5" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                HabitFlow
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Build Better Habits
              </p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-2 animate-slideLeft">
            <RippleButton
              onClick={() => onViewChange('habits')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${
                currentView === 'habits'
                  ? 'bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black shadow-lg animate-glow'
                  : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Target size={20} />
              <span className="hidden sm:inline">Habits</span>
            </RippleButton>
            
            <RippleButton
              onClick={() => onViewChange('analytics')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${
                currentView === 'analytics'
                  ? 'bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black shadow-lg animate-glow'
                  : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <BarChart3 size={20} />
              <span className="hidden sm:inline">Analytics</span>
            </RippleButton>
            
            <RippleButton
              onClick={() => onViewChange('settings')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${
                currentView === 'settings'
                  ? 'bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black shadow-lg animate-glow'
                  : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Settings size={20} />
              <span className="hidden sm:inline">Settings</span>
            </RippleButton>

            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-2" />

            <RippleButton
              onClick={toggleDarkMode}
              className="p-3 rounded-2xl text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun size={20} className="animate-wiggle" />
              ) : (
                <Moon size={20} className="animate-wiggle" />
              )}
            </RippleButton>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;