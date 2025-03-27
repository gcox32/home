'use client'

import Nav from '@/components/Layout/Nav';
import Footer from '@/components/Layout/Footer';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { AuthProvider } from '@/contexts/AuthContext';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Nav />
        {children}
        <Footer />
      </SettingsProvider>
    </AuthProvider>
  );
}