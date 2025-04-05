
import React from 'react';

const TactFluxLogo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M50 10L90 30V70L50 90L10 70V30L50 10Z" 
            stroke="url(#paint0_linear)" 
            strokeWidth="4" 
            fill="rgba(0,0,0,0.2)"
          />
          <defs>
            <linearGradient id="paint0_linear" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff00ff" />
              <stop offset="0.5" stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#00e8ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="font-bold text-2xl neon-text">tactflux.</span>
    </div>
  );
};

export default TactFluxLogo;
