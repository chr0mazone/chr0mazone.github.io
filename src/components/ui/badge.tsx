import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string; // e.g. 'bg-amber-950/40 text-amber-300 border-amber-600'
}

export function Badge({ className, color, children, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        // Base shape & typography
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5',
        'text-xs font-medium whitespace-nowrap shrink-0 uppercase tracking-wide',
        'leading-none align-middle transition-colors',
        // Icon sizing via Tailwind selector
        '[&>svg]:size-3 [&>svg]:shrink-0 [&>svg]:block',
        // Default color (grey) if none provided
        color ?? 'bg-neutral-900 text-neutral-400 border-neutral-700',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
