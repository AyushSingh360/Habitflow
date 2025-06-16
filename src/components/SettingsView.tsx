import React, { useState, useEffect } from 'react';
import { Bell, Download, Trash2, Moon, Sun, Smartphone } from 'lucide-react';
import { requestNotificationPermission, showInstantNotification } from '../utils/notifications';
import { useHabits } from '../hooks/useHabits';
import { useDarkMode } from '../hooks/useDarkMode';

const SettingsView: React.FC = () => {
  const { habits, deleteHabit } = useHabits();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    setNotificationsEnabled(Notification.permission === 'granted');

    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
    
    if (granted) {
      showInstantNotification(
        'Notifications Enabled!',
        'You\'ll now receive reminders for your habits.'
      );
    }
  };

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstallable(false);
        setDeferredPrompt(null);
      }
    }
  };

  const exportData = () => {
    const data = {
      habits,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `habitflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteHabit = async (habitId: string, habitName: string) => {
    if (window.confirm(`Are you sure you want to delete "${habitName}"? This will also delete all associated data.`)) {
      await deleteHabit(habitId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
          Customize your HabitFlow experience
        </p>
      </div>

      <div className="space-y-8">
        {/* App Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            App Settings
          </h2>
          
          <div className="space-y-4">
            {/* Dark Mode */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300">
              <div className="flex items-center space-x-3">
                {isDarkMode ? (
                  <Moon className="text-gray-600 dark:text-gray-400\" size={20} />
                ) : (
                  <Sun className="text-gray-600 dark:text-gray-400" size={20} />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                    Dark Mode
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    Switch between light and dark themes
                  </p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  isDarkMode ? 'bg-black' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300">
              <div className="flex items-center space-x-3">
                <Bell className="text-gray-600 dark:text-gray-400" size={20} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                    Notifications
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    Get reminders for your habits
                  </p>
                </div>
              </div>
              <button
                onClick={handleEnableNotifications}
                disabled={notificationsEnabled}
                className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  notificationsEnabled
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                }`}
              >
                {notificationsEnabled ? 'Enabled' : 'Enable'}
              </button>
            </div>

            {/* Install App */}
            {isInstallable && (
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <Smartphone className="text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                      Install App
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      Install HabitFlow for offline access
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleInstallApp}
                  className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                >
                  Install
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Data Management
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300">
              <div className="flex items-center space-x-3">
                <Download className="text-gray-600 dark:text-gray-400" size={20} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                    Export Data
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    Download your habits and progress data
                  </p>
                </div>
              </div>
              <button
                onClick={exportData}
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
              >
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Manage Habits */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Manage Habits
          </h2>
          
          {habits.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8 transition-colors duration-300">
              No habits to manage yet.
            </p>
          ) : (
            <div className="space-y-3">
              {habits.map(habit => (
                <div key={habit.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                      style={{ backgroundColor: habit.color }}
                    >
                      {habit.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                        {habit.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        {habit.category}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteHabit(habit.id, habit.name)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 transform hover:scale-110"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            About HabitFlow
          </h2>
          <div className="text-gray-600 dark:text-gray-400 space-y-2 transition-colors duration-300">
            <p>Version 1.0.0</p>
            <p>A beautiful, offline-first habit tracker built with React and IndexedDB © Ayush Kumar 2025</p>
            <p>Track your habits, build streaks, and analyze your progress over time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;