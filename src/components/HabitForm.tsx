import React, { useState } from 'react';
import { X, Palette, Clock, Tag, Target } from 'lucide-react';
import { Habit } from '../types/habit';
import RippleButton from './RippleButton';

interface HabitFormProps {
  habit?: Habit;
  onSave: (habit: Omit<Habit, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const COLORS = [
  '#EF4444', '#F97316', '#F59E0B', '#EAB308',
  '#84CC16', '#22C55E', '#10B981', '#14B8A6',
  '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1',
  '#8B5CF6', '#A855F7', '#D946EF', '#EC4899'
];

const CATEGORIES = [
  'Health & Fitness',
  'Learning',
  'Productivity',
  'Mindfulness',
  'Social',
  'Creative',
  'Personal Care',
  'Finance',
  'Career',
  'Other'
];

const ICONS = ['🎯', '💪', '📚', '🧘', '🎨', '💼', '🏃', '💡', '🌱', '⭐', '🔥', '💎', '🚀', '🎵', '📝', '🍎'];

const HabitForm: React.FC<HabitFormProps> = ({ habit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: habit?.name || '',
    description: habit?.description || '',
    color: habit?.color || COLORS[0],
    icon: habit?.icon || ICONS[0],
    category: habit?.category || CATEGORIES[0],
    reminderTime: habit?.reminderTime || '',
  });

  const [selectedColorIndex, setSelectedColorIndex] = useState(
    COLORS.indexOf(habit?.color || COLORS[0])
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full max-h-screen overflow-y-auto transform animate-slideUp transition-all duration-300 shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-2xl flex items-center justify-center">
                <Target className="text-white dark:text-black" size={20} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                {habit ? 'Edit Habit' : 'New Habit'}
              </h2>
            </div>
            <RippleButton
              onClick={onCancel}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <X size={24} className="text-gray-500 dark:text-gray-400" />
            </RippleButton>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <Target size={16} />
                <span>Habit Name</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black dark:focus:border-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 text-lg"
                placeholder="e.g., Drink 8 glasses of water"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <span>Description (Optional)</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black dark:focus:border-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 resize-none"
                placeholder="Why is this habit important to you?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <Tag size={16} />
                <span>Category</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black dark:focus:border-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 text-lg"
              >
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <span>Icon</span>
              </label>
              <div className="grid grid-cols-8 gap-3">
                {ICONS.map(icon => (
                  <RippleButton
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center transition-all duration-200 ${
                      formData.icon === icon 
                        ? 'bg-black dark:bg-white text-white dark:text-black scale-110 shadow-lg' 
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {icon}
                  </RippleButton>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <Palette size={16} />
                <span>Color</span>
              </label>
              <div className="grid grid-cols-8 gap-3">
                {COLORS.map((color, index) => (
                  <RippleButton
                    key={color}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, color });
                      setSelectedColorIndex(index);
                    }}
                    className={`w-12 h-12 rounded-2xl transition-all duration-200 ${
                      selectedColorIndex === index ? 'ring-4 ring-gray-400 dark:ring-gray-300 scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <Clock size={16} />
                <span>Reminder Time (Optional)</span>
              </label>
              <input
                type="time"
                value={formData.reminderTime}
                onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
                className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black dark:focus:border-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 text-lg"
              />
            </div>

            <div className="flex space-x-4 pt-6">
              <RippleButton
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 font-semibold text-lg"
              >
                Cancel
              </RippleButton>
              <RippleButton
                type="submit"
                className="flex-1 px-6 py-4 bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg animate-glow"
              >
                {habit ? 'Update' : 'Create'} Habit
              </RippleButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HabitForm;