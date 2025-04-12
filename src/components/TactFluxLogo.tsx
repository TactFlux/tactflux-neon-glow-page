
import React from 'react';
import Logo from './Logo';

interface TactFluxLogoProps {
  className?: string;
}

export const TactFluxLogo: React.FC<TactFluxLogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center ${className || ''}`}>
      <Logo />
    </div>
  );
};

export default TactFluxLogo;
