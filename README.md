<div align="center">

# 🎯 HabitFlow - Advanced PWA Habit Tracker


[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=000000)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=000000)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white&labelColor=000000)](https://web.dev/progressive-web-apps/)
[![IndexedDB](https://img.shields.io/badge/IndexedDB-Offline-FF6B35?style=for-the-badge&logo=database&logoColor=white&labelColor=000000)](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

**A stunning, production-ready Progressive Web App for tracking habits with advanced animations, offline capabilities, and comprehensive analytics. Built with modern web technologies and designed for excellence.**

[🚀 Live Demo](#) • [📖 Features](#-features) • [🛠️ Installation](#-installation) • [🎨 Animations](#-animations) • [📱 PWA Features](#-pwa-features)

---

</div>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 **Habit Management**
- **Smart Habit Creation** - Intuitive form with 16 colors & icons
- **Category Organization** - 10 predefined categories
- **Custom Reminders** - Time-based notifications
- **Streak Tracking** - Current & longest streak calculation
- **Progress Analytics** - Completion rates & insights

### 🎨 **Beautiful Design**
- **Dark/Light Mode** - Seamless theme switching
- **Advanced Animations** - 15+ custom animations
- **Micro-interactions** - Ripple effects & hover states
- **Responsive Design** - Perfect on all devices
- **Gradient Backgrounds** - Animated floating elements

</td>
<td width="50%">

### 📊 **Analytics & Insights**
- **Interactive Charts** - Weekly & monthly progress
- **Performance Metrics** - Detailed habit statistics
- **Motivational Quotes** - Daily inspiration
- **Completion Tracking** - Real-time progress updates
- **Data Export** - Backup your progress

### 🔧 **PWA Capabilities**
- **Offline First** - Works without internet
- **Installable** - Add to home screen
- **Push Notifications** - Habit reminders
- **Service Worker** - Background sync
- **IndexedDB Storage** - Local data persistence

</td>
</tr>
</table>

## 🎬 Animations & Effects

### 🌟 **Advanced Animation System**

HabitFlow features a comprehensive animation system with 15+ custom animations:

- **`fadeIn`** - Smooth entrance animations
- **`slideUp/Down/Left/Right`** - Directional slide effects
- **`bounce-gentle`** - Subtle bounce animations
- **`wiggle`** - Playful wiggle effects
- **`float`** - Floating elements background
- **`glow`** - Pulsing glow effects
- **`shimmer`** - Shimmer loading states
- **`ripple`** - Button click ripples
- **`heartbeat`** - Pulsing heart animations
- **`confetti`** - Celebration effects
- **`streak-fire`** - Streak flame animations

### 🎭 **Interactive Elements**

- **Ripple Buttons** - Material Design inspired click effects
- **Confetti Celebrations** - Habit completion rewards
- **Hover Transformations** - Scale and glow effects
- **Loading Animations** - Multi-layered spinners
- **Progress Bars** - Animated completion indicators

## 📱 PWA Features

### 🔄 **Offline Capabilities**
- **IndexedDB Storage** - Robust local database
- **Service Worker** - Background caching
- **Offline Analytics** - Works without connection
- **Data Synchronization** - Seamless online/offline

### 📲 **Installation**
- **Add to Home Screen** - Native app experience
- **Standalone Mode** - Full-screen operation
- **App Icons** - Custom 192x192 & 512x512 icons
- **Splash Screen** - Branded loading experience

### 🔔 **Notifications**
- **Browser Notifications** - Habit reminders
- **Permission Management** - User-controlled
- **Scheduled Alerts** - Time-based reminders
- **Instant Feedback** - Completion notifications

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+ and npm/yarn
```

### Installation

```bash
# Clone the repository
git clone https://github.com/AyushSingh360/habitflow.git

# Navigate to project directory
cd habitflow

# Install dependencies
npm install

# Start development server
npm run dev
```

🎉 **That's it!** HabitFlow will be running at `http://localhost:5173`

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🚀 Start development server with hot reload |
| `npm run build` | 📦 Build optimized production bundle |
| `npm run preview` | 👀 Preview production build locally |
| `npm run lint` | 🔍 Run ESLint for code quality |

## 🏗️ Architecture

### 📁 **Project Structure**

```
habitflow/
├── 📁 public/
│   ├── manifest.json          # PWA manifest
│   └── habit-icon-*.png       # App icons
├── 📁 src/
│   ├── 📁 components/
│   │   ├── AnimatedBackground.tsx    # Floating animations
│   │   ├── ConfettiEffect.tsx       # Celebration effects
│   │   ├── RippleButton.tsx         # Interactive buttons
│   │   ├── HabitCard.tsx            # Habit display cards
│   │   ├── HabitForm.tsx            # Habit creation form
│   │   ├── HabitsView.tsx           # Main habits interface
│   │   ├── AnalyticsView.tsx        # Charts & statistics
│   │   ├── SettingsView.tsx         # App configuration
│   │   └── Header.tsx               # Navigation header
│   ├── 📁 hooks/
│   │   ├── useHabits.ts             # Habit management logic
│   │   └── useDarkMode.ts           # Theme switching
│   ├── 📁 utils/
│   │   ├── database.ts              # IndexedDB operations
│   │   ├── habitStats.ts            # Statistics calculations
│   │   └── notifications.ts         # Push notifications
│   ├── 📁 types/
│   │   └── habit.ts                 # TypeScript definitions
│   └── App.tsx                      # Main application
├── 📄 vite.config.ts               # Vite & PWA configuration
├── 📄 tailwind.config.js           # Tailwind & animations
└── 📄 package.json                 # Dependencies & scripts
```

### 🔧 **Technology Stack**

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Animations
- **Database**: IndexedDB (via idb library)
- **Charts**: Chart.js + React-ChartJS-2
- **PWA**: Vite-Plugin-PWA + Workbox
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Date Handling**: date-fns

## 🎨 Customization

### 🌈 **Adding Custom Animations**

```javascript
// tailwind.config.js
extend: {
  animation: {
    'your-animation': 'yourKeyframes 1s ease-in-out infinite',
  },
  keyframes: {
    yourKeyframes: {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
      '100%': { transform: 'scale(1)' },
    },
  },
}
```

### 🎯 **Custom Habit Categories**

```typescript
// src/components/HabitForm.tsx
const CATEGORIES = [
  'Your Custom Category',
  'Health & Fitness',
  // ... existing categories
];
```

### 🎨 **Color Themes**

```typescript
// src/components/HabitForm.tsx
const COLORS = [
  '#YourColor',
  '#EF4444', // Red
  // ... existing colors
];
```

## 📊 Analytics Features

### 📈 **Progress Tracking**
- **Daily Completion Rates** - Track daily progress
- **Weekly Charts** - Bar charts for weekly view
- **Monthly Trends** - Line charts for long-term trends
- **Streak Analytics** - Current vs. longest streaks
- **Category Performance** - Habits by category

### 🏆 **Achievement System**
- **Streak Milestones** - Celebrate consistency
- **Completion Badges** - Perfect day rewards
- **Progress Celebrations** - Confetti animations
- **Motivational Quotes** - Daily inspiration

## 🔒 Data & Privacy

### 💾 **Local Storage**
- **IndexedDB** - All data stored locally
- **No Cloud Sync** - Complete privacy
- **Export/Import** - Data portability
- **Offline First** - Works without internet

### 🛡️ **Security**
- **Client-Side Only** - No server dependencies
- **No Tracking** - No analytics or tracking
- **Open Source** - Transparent codebase
- **Self-Hosted** - Deploy anywhere

## 🚀 Deployment

### 📦 **Build for Production**

```bash
npm run build
```

### 🌐 **Deploy to Netlify**

```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
# Or connect your GitHub repo for auto-deployment
```

### 🔧 **Deploy to Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 🐳 **Docker Deployment**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **💾 Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **📤 Push** to the branch (`git push origin feature/amazing-feature`)
5. **🔄 Open** a Pull Request

### 🐛 **Bug Reports**
- Use GitHub Issues for bug reports
- Include steps to reproduce
- Provide browser/device information

### 💡 **Feature Requests**
- Describe the feature in detail
- Explain the use case
- Consider implementation complexity

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon set
- **Chart.js** - For the powerful charting library
- **Workbox** - For PWA capabilities
- **Pexels** - For high-quality stock images

## 📞 Support & Community

- 📧 **Email**: ayushsingh21109@gmail.com
- 💬 **Issues**: [GitHub Issues](https://github.com/AyushSingh360/habitflow/issues)
- 🐦 **Twitter**:  
- 💬 **Discord**: 

## 🌟 Roadmap

### 🔮 **Upcoming Features**
- [ ] **Habit Templates** - Pre-built habit suggestions
- [ ] **Social Features** - Share progress with friends
- [ ] **Advanced Analytics** - ML-powered insights
- [ ] **Habit Chains** - Link related habits
- [ ] **Custom Themes** - User-created color schemes
- [ ] **Voice Commands** - Hands-free habit logging
- [ ] **Wearable Integration** - Smartwatch support

### 🎯 **Version 2.0 Goals**
- **Cloud Sync** - Optional cloud backup
- **Team Habits** - Collaborative habit tracking
- **API Integration** - Connect with fitness apps
- **Advanced Notifications** - Smart reminder system

---

<div align="center">

### 🌟 **Star this repository if it helped you build better habits!** 🌟

**Made with ❤️ and dedication to helping people build better lives**

[![GitHub stars](https://img.shields.io/github/stars/AyushSingh360/habitflow?style=social)](https://github.com/AyushSingh360/habitflow/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/AyushSingh360/habitflow?style=social)](https://github.com/AyushSingh360/habitflow/network/members)
[![GitHub issues](https://img.shields.io/github/issues/AyushSingh360/habitflow?style=social)](https://github.com/AyushSingh360/habitflow/issues)

**Transform your life, one habit at a time with HabitFlow** 🚀

</div>