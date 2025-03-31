import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export default function CollapsibleSection({ 
  title, 
  children, 
  defaultExpanded = false 
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="mb-4 border border-[var(--color-border-base)] rounded-lg">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex justify-between items-center bg-[var(--color-background-secondary)] hover:bg-[var(--color-hover-background)] p-4 w-full transition-colors cursor-pointer ${isExpanded ? 'rounded-t-lg' : 'rounded-lg'}`}
      >
        <h2 className="font-semibold text-[var(--color-foreground)] text-lg">{title}</h2>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </button>
      <div className="grid rounded-b-lg transition-all duration-200 ease-in-out" style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}>
        <div className="rounded-b-lg overflow-hidden">
          <div className="bg-[var(--color-background-secondary)] p-4 border-t border-[var(--color-border-base)] rounded-b-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 