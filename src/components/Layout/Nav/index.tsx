'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import SignInModal from '@/components/Auth/SignInModal';
import { useSettings } from '@/contexts/SettingsContext';
import { useAuth } from '@/contexts/AuthContext';
import SignInButton from '@/components/Auth/SignInButton';
import Hamburger from './Hamburger';
import MobileNav from './MobileNav';
import { navLinks } from './config';

export default function Nav() {
  const { isDarkMode } = useSettings();
  const { isAuthenticated, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const allNavLinks = [
    ...navLinks,
    ...(isAuthenticated ? [{ label: 'Admin', href: '/manage' }] : []),
  ];

  return (
    <>
      <nav className="top-0 z-50 fixed px-4 py-3 dark:border-white/[.145] border-b border-black/[.08] w-full">
        <div className="flex justify-between items-center mx-auto max-w-7xl">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center hover:bg-black/[.05] dark:hover:bg-white/[.06] p-1 rounded-[50%] hover:text-primary transition-colors">
              <Image
                src={isDarkMode ? '/icons/dark/android-chrome-192x192.png' : '/icons/android-chrome-192x192.png'}
                alt="Logo"
                width={32}
                height={32}
                priority
              />
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {allNavLinks.map((link, index) => (
                <Link key={index} href={link.href} className="hover:bg-black/[.05] dark:hover:bg-white/[.06] px-3 py-1.5 rounded-lg hover:text-primary transition-colors">
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
          navLinks={allNavLinks}
        />
      </nav>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </>
  );
}