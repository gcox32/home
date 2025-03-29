'use client'

import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/');
    }
  }, [isAuthenticated]);

  // Don't render anything until we've checked authentication
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
