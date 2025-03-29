import styles from './styles.module.css';

interface SkeletonProps {
  variant?: 'list' | 'single';
  count?: number;
}

export default function Skeleton({ variant = 'list', count = 3 }: SkeletonProps) {
  if (variant === 'single') {
    return (
      <div className="animate-pulse">
        <div className="bg-black/[.05] dark:bg-white/[.05] mb-8 rounded w-4/5 h-12" />
        <div className="space-y-4">
          <div className="bg-black/[.05] dark:bg-white/[.05] rounded h-4" />
          <div className="bg-black/[.05] dark:bg-white/[.05] rounded w-[90%] h-4" />
          <div className="bg-black/[.05] dark:bg-white/[.05] rounded w-[85%] h-4" />
          <div className="bg-black/[.05] dark:bg-white/[.05] rounded w-[80%] h-4" />
          <div className="bg-black/[.05] dark:bg-white/[.05] rounded w-[75%] h-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      <div className="bg-black/[.05] dark:bg-white/[.05] mb-8 rounded w-4/5 h-12" />
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div 
            key={index} 
            className="border dark:border-white/10 border-black/10 rounded-lg overflow-hidden"
          >
            <div className="bg-black/[.05] dark:bg-white/[.05] aspect-[16/9]" />
            <div className="space-y-4 p-6">
              <div className="bg-black/[.05] dark:bg-white/[.05] rounded h-6" />
              <div className="bg-black/[.05] dark:bg-white/[.05] rounded w-3/5 h-4" />
              <div className="bg-black/[.05] dark:bg-white/[.05] rounded h-4" />
              <div className="bg-black/[.05] dark:bg-white/[.05] rounded w-[90%] h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 