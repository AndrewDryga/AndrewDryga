import React from 'react';
import { cn } from '@/lib/utils';

interface TerminalProgressBarProps {
  value: number; // 0-100
  label?: string;
  className?: string;
}

export const TerminalProgressBar: React.FC<TerminalProgressBarProps> = ({
  value,
  label,
  className
}) => {
  const filledBlocks = Math.round((value / 100) * 24);
  const emptyBlocks = 24 - filledBlocks;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between text-sm font-mono">
          <span className="text-foreground">{label}</span>
          <span className="text-primary">{value}%</span>
        </div>
      )}
      <div className="font-mono text-sm text-terminal-green">
        [{'█'.repeat(filledBlocks)}{'░'.repeat(emptyBlocks)}]
      </div>
    </div>
  );
};
