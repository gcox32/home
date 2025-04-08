import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  defaultVisible?: boolean;
  storageKey?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({ 
  children, 
  content,
  defaultVisible = false,
  storageKey,
  position = 'bottom'
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (storageKey) {
      const hasBeenDismissed = localStorage.getItem(storageKey) === 'dismissed';
      setIsVisible(defaultVisible && !hasBeenDismissed);
    } else {
      setIsVisible(defaultVisible);
    }
  }, [defaultVisible, storageKey]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (storageKey) {
      localStorage.setItem(storageKey, 'dismissed');
    }
  };

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2'
  };

  return (
    <div className="inline-block relative">
      {children}
      {isVisible && (
        <div className={`absolute ${positionClasses[position]} z-50 w-max max-w-xs`}>
          <div className="bg-black shadow-lg px-3 py-2 rounded-lg text-white text-sm">
            <div className="flex items-center gap-2">
              <span>{content}</span>
              <button
                onClick={handleDismiss}
                className="text-white/60 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 