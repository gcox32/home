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
    <div className="mb-4 border dark:border-white/10 border-black/10 rounded-lg">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex justify-between items-center bg-black/[.02] hover:bg-black/[.05] dark:bg-white/[.02] dark:hover:bg-white/[.05] p-4 rounded-lg w-full transition-colors cursor-pointer"
      >
        <h2 className="font-semibold text-foreground text-lg">{title}</h2>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </button>
      <div className="grid transition-all duration-100 ease-in-out" style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="p-4 dark:border-white/10 border-t border-black/10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 