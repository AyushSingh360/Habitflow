import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HabitsView from './components/HabitsView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import { initDB } from './utils/database';

type View = 'habits' | 'analytics' | 'settings';

function App() {
  const [currentView, setCurrentView] = useState<View>('habits');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDB();
      } catch (error) {
        console.error('Failed to initialize database:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center animate-fadeIn">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-3xl flex items-center justify-center mx-auto animate-float shadow-2xl">
              <span className="text-white dark:text-black font-bold text-2xl">H</span>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            HabitFlow
          </h2>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 animate-pulse">
            Loading your habits...
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'habits':
        return <HabitsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HabitsView />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="animate-fadeIn">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;