interface TechnologyBadgeProps {
    name: string;
  }
  
  export default function TechnologyBadge({ name }: TechnologyBadgeProps) {
    return (
      <span className="bg-primary/10 px-3 py-1 rounded-full text-sm" style={{ color: 'var(--text-white)' }}>
        {name}
      </span>
    );
  }