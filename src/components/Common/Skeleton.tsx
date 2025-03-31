interface SkeletonProps {
  variant?: 'list' | 'single';
  count?: number;
}

export default function Skeleton({ variant = 'list', count = 3 }: SkeletonProps) {
  if (variant === 'single') {
    return (
      <div className="animate-pulse">
        <div className="bg-[var(--color-hover-background)] mb-8 rounded h-12" />
        <div className="space-y-4">
          <div className="bg-[var(--color-hover-background)] rounded h-4" />
          <div className="bg-[var(--color-hover-background)] rounded w-[90%] h-4" />
          <div className="bg-[var(--color-hover-background)] rounded w-[85%] h-4" />
          <div className="bg-[var(--color-hover-background)] rounded w-[80%] h-4" />
          <div className="bg-[var(--color-hover-background)] rounded w-[75%] h-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      <div className="bg-[var(--color-hover-background)] mb-8 rounded h-12" />
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div 
            key={index} 
            className="border border-[var(--color-border-base)] rounded-lg overflow-hidden"
          >
            <div className="bg-[var(--color-hover-background)] aspect-[16/9]" />
            <div className="space-y-4 p-6">
              <div className="bg-[var(--color-hover-background)] rounded h-6" />
              <div className="bg-[var(--color-hover-background)] rounded w-3/5 h-4" />
              <div className="bg-[var(--color-hover-background)] rounded h-4" />
              <div className="bg-[var(--color-hover-background)] rounded w-[90%] h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 