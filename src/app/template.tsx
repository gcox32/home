'use client'

import Nav from '@/components/Layout/Nav';
import Footer from '@/components/Layout/Footer';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { SnackbarProvider } from '@/contexts/SnackbarContext';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SettingsProvider>
        <div className="flex flex-col min-h-screen">
          <SnackbarProvider>
            <Nav />
            <main className="flex-grow mt-18" >
              {children}
            </main>
            <Footer />
          </SnackbarProvider>
        </div>
      </SettingsProvider>
    </AuthProvider>
  );
}