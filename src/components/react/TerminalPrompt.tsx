import React from 'react';
import { cn } from '@/lib/utils';

interface TerminalPromptProps {
  command: string;
  color?: 'cyan' | 'green' | 'yellow' | 'primary';
  className?: string;
}

export const TerminalPrompt: React.FC<TerminalPromptProps> = ({ 
  command, 
  color = 'cyan',
  className 
}) => {
  const colorClasses = {
    cyan: 'text-terminal-cyan',
    green: 'text-terminal-green',
    yellow: 'text-terminal-yellow',
    primary: 'text-primary'
  };

  return (
    <div className={cn("font-mono text-sm", className)}>
      <span className={colorClasses[color]}>$ </span>
      <span className="text-foreground">{command}</span>
    </div>
  );
};
