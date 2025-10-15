import React from 'react';
import { cn } from '@/lib/utils';

interface SequenceDiagramProps {
  children: React.ReactNode;
  className?: string;
}

export const SequenceDiagram: React.FC<SequenceDiagramProps> = ({ children, className }) => {
  return (
    <div className={cn("border border-border rounded-lg p-6 bg-terminal-surface font-mono text-xs overflow-x-auto", className)}>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

interface ParticipantProps {
  name: string;
  color?: 'primary' | 'accent' | 'secondary' | 'terminal-green';
  position: 'left' | 'right';
}

export const Participant: React.FC<ParticipantProps> = ({ name, color = 'primary', position }) => {
  const colorClasses = {
    primary: 'bg-primary/20 text-primary border-primary',
    accent: 'bg-accent/20 text-accent border-accent',
    secondary: 'bg-secondary/20 text-secondary border-secondary',
    'terminal-green': 'bg-terminal-green/20 text-terminal-green border-terminal-green'
  };

  return (
    <div className={cn(
      "absolute top-0 -translate-x-1/2",
      position === 'left' ? 'left-[15%]' : 'left-[85%]'
    )}>
      <div className={cn("inline-block p-3 border-2 rounded font-bold", colorClasses[color])}>
        {name}
      </div>
    </div>
  );
};

export const Participants: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <div className="relative h-16 mb-4">
      {children}
    </div>
  );
};

interface MessageProps {
  label: string;
  type?: 'request' | 'response' | 'async' | 'error' | 'success';
  direction?: 'left' | 'right';
  className?: string;
}

export const Message: React.FC<MessageProps> = ({ label, type = 'request', direction, className }) => {
  const typeStyles = {
    request: {
      line: 'border-primary',
      arrow: 'border-l-primary',
      text: 'text-foreground border-border',
      defaultDirection: 'right' as const
    },
    response: {
      line: 'border-dashed border-secondary',
      arrow: 'border-r-secondary',
      text: 'text-secondary border-secondary',
      defaultDirection: 'left' as const
    },
    async: {
      line: 'border-dashed border-accent',
      arrow: 'border-l-accent',
      text: 'text-accent border-accent',
      defaultDirection: 'right' as const
    },
    error: {
      line: 'border-dashed border-destructive',
      arrow: 'border-r-destructive',
      text: 'text-destructive border-destructive',
      defaultDirection: 'left' as const
    },
    success: {
      line: 'border-dashed border-terminal-green',
      arrow: 'border-r-terminal-green',
      text: 'text-terminal-green border-terminal-green',
      defaultDirection: 'left' as const
    }
  };

  const style = typeStyles[type];
  const actualDirection = direction || style.defaultDirection;

  return (
    <div className={cn("relative h-16", className)}>
      <div className="absolute left-[15%] right-[15%] top-1/2 -translate-y-1/2 flex items-center">
        <div className={cn("w-full border-t-2 relative", style.line)}>
          {actualDirection === 'right' ? (
            <div className={cn("absolute right-0 top-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] -translate-y-[calc(50%+1px)]", style.arrow)}></div>
          ) : (
            <div className={cn("absolute left-0 top-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] -translate-y-[calc(50%+1px)]", style.arrow)}></div>
          )}
        </div>
      </div>
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className={cn("inline-block bg-terminal-surface px-2 py-1 text-[10px] border rounded whitespace-nowrap", style.text)}>
          {label}
        </div>
      </div>
    </div>
  );
};

export const Messages: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <div className="relative min-h-[200px]">
      {/* Vertical lifelines - extend up to connect with participants */}
      <div className="absolute left-[15%] -top-4 bottom-0 w-px border-l-2 border-dashed border-primary/30"></div>
      <div className="absolute left-[85%] -top-4 bottom-0 w-px border-l-2 border-dashed border-accent/30"></div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};

export const SelfCall: React.FC<{ label: string; position?: 'left' | 'right' }> = ({ label, position = 'left' }) => {
  return (
    <div className="relative h-20 flex items-center">
      <div className={cn("absolute w-16", position === 'left' ? 'left-[15%]' : 'left-[85%] -translate-x-full')}>
        <div className={cn("border-2 border-accent rounded-lg h-12", position === 'left' ? 'rounded-l-none border-l-0' : 'rounded-r-none border-r-0')}></div>
      </div>
      <div className={cn("absolute top-1/2 -translate-y-1/2", position === 'left' ? 'left-[15%] ml-20' : 'left-[85%] -translate-x-full mr-20')}>
        <div className="inline-block bg-terminal-surface px-2 py-1 text-accent text-[10px] border border-accent rounded whitespace-nowrap">
          {label}
        </div>
      </div>
    </div>
  );
};

export const ActivationBox: React.FC<{ children: React.ReactNode; position?: 'left' | 'right' }> = ({ children, position = 'left' }) => {
  return (
    <div className="relative">
      <div className={cn("absolute w-3 bg-primary/10 border border-primary top-0 bottom-0", 
        position === 'left' ? 'left-[15%] -translate-x-1/2' : 'left-[85%] -translate-x-1/2'
      )}></div>
      {children}
    </div>
  );
};

export const Note: React.FC<{ text: string; position?: 'left' | 'right' | 'center' }> = ({ text, position = 'center' }) => {
  const positionClasses = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center'
  };

  return (
    <div className={cn("relative h-12 flex items-center", positionClasses[position])}>
      <div className="inline-block bg-secondary/10 px-3 py-2 text-secondary text-[10px] border border-secondary rounded italic">
        {text}
      </div>
    </div>
  );
};
