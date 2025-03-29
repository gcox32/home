import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './styles.module.css';

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
    <div className={styles.section}>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.header}
      >
        <h2 className={styles.title}>{title}</h2>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isExpanded && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
} 