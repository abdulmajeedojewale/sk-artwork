'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'icon' | 'monogram';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  href = '/',
  showText = true,
}) => {
  // Size dimensions
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-13 h-13',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const LogoIcon = (
    <div className={`relative ${iconSizes[size]} flex-shrink-0 group`}>
      {/* Outer ambient glow */}
      <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500 via-purple-600 to-pink-500 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300" />
      
      {/* Main Logo Container */}
      <div className="relative w-full h-full bg-[#0a0d14] rounded-xl p-[2px] flex items-center justify-center border border-amber-500/30 overflow-hidden shadow-xl">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="skGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="skPurpleGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="brushStroke" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Background Artistic Painterly Brush Arc */}
          <path
            d="M 12 78 C 30 92, 70 92, 88 78 C 96 70, 88 40, 78 30 C 65 18, 35 18, 20 30 C 8 40, 5 70, 12 78 Z"
            fill="url(#brushStroke)"
            opacity="0.15"
          />

          {/* Dynamic Painterly Swall Brush Line */}
          <path
            d="M 18 82 C 38 92, 72 88, 86 70"
            stroke="url(#skGoldGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Monogram 'S' Letter Path */}
          <path
            d="M 40 32 C 32 30, 24 35, 24 43 C 24 53, 44 51, 44 62 C 44 71, 34 76, 26 73"
            stroke="url(#skGoldGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Monogram 'K' Stem & Arms Path */}
          <path
            d="M 54 28 V 74 M 76 30 L 55 52 L 78 74"
            stroke="url(#skPurpleGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Small Artistic Paint Splatter Dots */}
          <circle cx="82" cy="24" r="3.5" fill="#f59e0b" />
          <circle cx="88" cy="34" r="2" fill="#ec4899" />
          <circle cx="20" cy="24" r="2.5" fill="#c084fc" />
        </svg>
      </div>
    </div>
  );

  const LogoText = (
    <div className="flex flex-col">
      <span className={`${textSizes[size]} font-black font-display tracking-tight text-white flex items-center gap-1.5 leading-none`}>
        SK ARTWORKS
      </span>
    </div>
  );

  if (variant === 'icon') {
    return href ? <Link href={href} className={`inline-block ${className}`}>{LogoIcon}</Link> : LogoIcon;
  }

  const content = (
    <div className={`flex items-center space-x-3.5 ${className}`}>
      {LogoIcon}
      {showText && LogoText}
    </div>
  );

  return href ? <Link href={href} className="group inline-flex items-center">{content}</Link> : content;
};
