'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import { useSettings } from '@/contexts/SettingsContext';

export default function Nav() {
  const { isDarkMode } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="top-0 z-50 fixed bg-transparent px-4 py-3 dark:border-white/[.145] border-b border-black/[.08] w-full">
      <div className="flex justify-between items-center mx-auto max-w-7xl">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src={isDarkMode ? '/icons/dark/android-chrome-192x192.png' : '/icons/android-chrome-192x192.png'}
              alt="Logo"
              width={32}
              height={32}
              priority
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/portfolio" className="hover:text-primary transition-colors">
              Portfolio
            </Link>
            <Link href="/projects" className="hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DarkModeToggle />
          
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden hover:bg-black/[.05] dark:hover:bg-white/[.06] p-2 rounded-full cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col justify-center gap-1.5 w-5 h-5">
              <span className={`block h-0.5 w-5 bg-foreground transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-5 bg-foreground transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-foreground transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute left-0 right-0 bg-background dark:bg-[#0a0a0a] border-b border-black/[.08] dark:border-white/[.145] transition-all duration-300 ${
          isMenuOpen ? 'top-full opacity-100' : '-top-96 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 p-4">
          <Link
            href="/portfolio"
            className="px-2 py-1.5 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            href="/projects"
            className="px-2 py-1.5 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="px-2 py-1.5 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="px-2 py-1.5 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}