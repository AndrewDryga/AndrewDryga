import React from 'react';
import { cn } from '@/lib/utils';
import { TerminalPrompt } from './TerminalPrompt';

interface SectionHeaderProps {
  title: string;
  command?: string;
  description?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  command,
  description,
  className 
}) => {
  return (
    <div className={cn("mb-8", className)}>
      {command && <TerminalPrompt command={command} className="mb-2" />}
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
