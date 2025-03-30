import React, { createContext, useContext, useState, useCallback } from 'react';
import Snackbar from '@/components/Common/Snackbar';

type SnackbarType = 'success' | 'error' | 'info';

interface SnackbarContextType {
  showSnackbar: (message: string, type: SnackbarType) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<SnackbarType>('info');
  const [visible, setVisible] = useState(false);

  const showSnackbar = useCallback((message: string, type: SnackbarType) => {
    setMessage(message);
    setType(type);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar message={message} type={type} visible={visible} />
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
} 