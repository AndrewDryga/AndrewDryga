import React from 'react';
import { cn } from '@/lib/utils';

interface TerminalSpinnerProps {
  type?: 'blocks' | 'dots' | 'cursor' | 'pulse';
  text?: string;
  className?: string;
}

export const TerminalSpinner: React.FC<TerminalSpinnerProps> = ({
  type = 'blocks',
  text,
  className
}) => {
  const spinners = {
    blocks: (
      <>
        <span className="animate-pulse">█</span>
        <span className="animate-pulse" style={{animationDelay: '0.15s'}}>▓</span>
        <span className="animate-pulse" style={{animationDelay: '0.3s'}}>▒</span>
        <span className="animate-pulse" style={{animationDelay: '0.45s'}}>░</span>
        {text && <span className="ml-2">{text}</span>}
      </>
    ),
    dots: (
      <span className="font-mono">
        {text}
        <span className="animate-pulse">...</span>
      </span>
    ),
    cursor: (
      <div className="flex items-center gap-2">
        <span className="animate-spin inline-block">|</span>
        {text && <span>{text}</span>}
      </div>
    ),
    pulse: (
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        {text && <span>{text}</span>}
      </div>
    )
  };

  return <div className={cn("font-mono text-sm", className)}>{spinners[type]}</div>;
};
