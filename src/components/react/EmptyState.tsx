import React from 'react';
import { cn } from '@/lib/utils';
import { TerminalPrompt } from './TerminalPrompt';

interface EmptyStateProps {
  icon?: React.ReactNode;
  command: string;
  output?: string;
  message: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  command,
  output,
  message,
  action,
  className
}) => {
  return (
    <div className={cn("border border-border rounded-lg p-8 bg-card text-center", className)}>
      {icon && <div className="flex justify-center mb-4">{icon}</div>}
      <div className="flex justify-center">
        <TerminalPrompt command={command} className="mb-2" />
      </div>
      {output && <pre className="font-mono text-xs text-muted-foreground mb-4">{output}</pre>}
      <p className="text-sm text-muted-foreground mb-4">{message}</p>
      {action}
    </div>
  );
};
