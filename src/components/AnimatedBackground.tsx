import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-black/5 dark:bg-white/5 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-purple-200/20 to-transparent dark:from-purple-800/20 rounded-full animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-blue-200/20 to-transparent dark:from-blue-800/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      {/* Geometric Shapes */}
      <div className="absolute top-1/3 right-1/3 w-4 h-4 border border-black/10 dark:border-white/10 rotate-45 animate-wiggle" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-6 h-6 border border-black/10 dark:border-white/10 rounded-full animate-bounce-gentle" style={{ animationDelay: '3s' }} />
    </div>
  );
};

export default AnimatedBackground;