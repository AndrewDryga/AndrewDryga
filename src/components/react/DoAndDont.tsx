import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface DoAndDontProps {
  doText: string;
  dontText: string;
  className?: string;
}

export const DoAndDont: React.FC<DoAndDontProps> = ({ 
  doText, 
  dontText,
  className 
}) => {
  return (
    <div className={cn("grid md:grid-cols-2 gap-4", className)}>
      <div className="border border-terminal-green rounded-lg p-4 bg-terminal-green/5">
        <div className="flex items-center gap-2 text-terminal-green mb-2 font-mono text-sm">
          <Check className="h-4 w-4" />
          <span>Do</span>
        </div>
        <p className="text-foreground text-sm">{doText}</p>
      </div>
      <div className="border border-destructive rounded-lg p-4 bg-destructive/5">
        <div className="flex items-center gap-2 text-destructive mb-2 font-mono text-sm">
          <X className="h-4 w-4" />
          <span>Don't</span>
        </div>
        <p className="text-foreground text-sm">{dontText}</p>
      </div>
    </div>
  );
};
