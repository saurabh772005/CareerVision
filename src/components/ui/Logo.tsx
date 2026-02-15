
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  lightText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true, size = 'md', lightText = false }) => {
  const iconSize = size === 'sm' ? 'h-6' : size === 'lg' ? 'h-12' : 'h-8';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl';

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Brand Graphic - Triple Pill Design */}
      <div className={`relative ${iconSize} aspect-[1.4/1] flex items-center`}>
        {/* Dark Blue Pill */}
        <div className="absolute left-0 w-[45%] h-[70%] bg-[#0047FF] rounded-full rotate-[-45deg] z-10" />
        {/* Light Blue Pill */}
        <div className="absolute left-[25%] w-[45%] h-[70%] bg-[#00C2FF] rounded-full rotate-[-45deg] z-20" />
        {/* Teal Accent Pill */}
        <div className="absolute left-[50%] w-[45%] h-[70%] bg-[#02C39A] rounded-full rotate-[-45deg] z-30" />
      </div>

      {/* Brand Text */}
      {showText && (
        <span className={`${textSize} font-black tracking-tighter ${lightText ? 'text-white' : 'text-[#0A0E27]'}`}>
          CareerVision
        </span>
      )}
    </div>
  );
};

export default Logo;
