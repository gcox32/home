'use client'

import React from 'react';
import { useSettings } from '@/contexts/SettingsContext';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useSettings();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative flex justify-center items-center hover:bg-black/[.05] dark:hover:bg-white/[.06] p-2 rounded-full w-10 h-10 transition-colors cursor-pointer"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div
        className={`absolute transition-all duration-200 ease-in-out ${
          isDarkMode 
            ? 'scale-100 rotate-0 opacity-100' 
            : 'scale-0 -rotate-45 opacity-0'
        }`}
      >
        <SunIcon className="w-5 h-5" />
      </div>
      
      <div
        className={`absolute transition-all duration-200 ease-in-out ${
          isDarkMode 
            ? 'scale-0 rotate-45 opacity-0' 
            : 'scale-100 rotate-0 opacity-100'
        }`}
      >
        <MoonIcon className="w-5 h-5" />
      </div>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
  );
}