import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsiblePanelProps {
  // Accept either a string label or a ReactNode for full flexibility
  label: string | ReactNode;
  children?: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function CollapsiblePanel({
  label,
  children,
  defaultOpen = false,
  className,
}: CollapsiblePanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn('mobile-sidebar-panel', className)}>
      <button
        className="mobile-sidebar-toggle"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className="mobile-sidebar-toggle-label">{label}</span>
        {open
          ? <ChevronUp size={16} strokeWidth={2} aria-hidden />
          : <ChevronDown size={16} strokeWidth={2} aria-hidden />
        }
      </button>
      {open && (
        <div className="mobile-sidebar-body open">{children}</div>
      )}
    </div>
  );
}
