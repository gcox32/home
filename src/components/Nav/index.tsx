'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import SignInModal from '../Auth/SignInModal';
import { useSettings } from '@/contexts/SettingsContext';
import { useAuth } from '@/contexts/AuthContext';
import SignInButton from '../Auth/SignInButton';
import Hamburger from './Hamburger';
import MobileNav from './MobileNav';
import { navLinks } from './config';

export default function Nav() {
  const { isDarkMode } = useSettings();
  const { isAuthenticated, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  return (
    <>
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

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DarkModeToggle />

            <SignInButton
              isAuthenticated={isAuthenticated}
              signOut={signOut}
              setIsSignInModalOpen={setIsSignInModalOpen}
            />

            <Hamburger
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        </div>

        <MobileNav
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </nav>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </>
  );
}