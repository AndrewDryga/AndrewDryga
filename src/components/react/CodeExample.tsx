import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { Button } from './ui/button';

interface CodeExampleProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeExample: React.FC<CodeExampleProps> = ({ 
  code, 
  language = 'typescript',
  className 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <details className={cn("group", className)}>
      <summary className="cursor-pointer text-primary hover:text-primary/80 font-mono text-sm mb-2 transition-colors duration-200">
        Show code
      </summary>
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="absolute top-2 right-2 h-8 w-8 p-0"
        >
          {copied ? (
            <Check className="h-4 w-4 text-terminal-green" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <pre className="bg-terminal-surface p-4 rounded border border-border overflow-x-auto">
          <code className="font-mono text-xs text-foreground">{code}</code>
        </pre>
      </div>
    </details>
  );
};
