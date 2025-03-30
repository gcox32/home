import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await signIn(username, password);
    if (success) {
      setUsername('');
      setPassword('');
      onClose();
    } else {
      setError('Invalid credentials');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="z-[100] fixed inset-0 flex justify-center items-center bg-black/50" onClick={onClose}>
      <div 
        className="bg-[var(--color-background)] shadow-lg p-6 rounded-lg w-full max-w-md text-[var(--color-foreground)]" 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 font-bold text-2xl">Sign In</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <div>
            <label htmlFor="username" className="block mb-1 font-medium text-sm">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[var(--color-background)] px-3 py-2 border focus:border-[var(--color-accent)] border-[var(--color-border-base)] rounded-lg focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2 w-full"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[var(--color-background)] px-3 py-2 border focus:border-[var(--color-accent)] border-[var(--color-border-base)] rounded-lg focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2 w-full"
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="hover:bg-[var(--color-hover-background)] px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="hover:bg-[var(--color-hover-background)] px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 