'use client'

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { SettingsProvider } from '@/contexts/SettingsContext';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <Nav />
      {children}
      <Footer />
    </SettingsProvider>
  );
}