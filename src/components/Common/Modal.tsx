import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
      <div 
        ref={modalRef}
        className="bg-[var(--color-background)] p-5 rounded-lg w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto text-[var(--color-foreground)]"
      >
        <div className="flex justify-between items-center mb-5 pb-2.5 border-[var(--color-border-base)] border-b">
          <h4 className="font-semibold text-lg">{title}</h4>
          <button  
            onClick={onClose}
            className="hover:opacity-70 text-2xl leading-none transition-opacity cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
} 