'use client';

import { useState } from 'react';
import { CodeBlock } from './code-block';
import { cn } from './code-block';
import { getLanguageIcon } from './language-icons';

export type TFile = {
  name: string;
  code: string;
  language: string;
  badges?: Array<{
    text: string;
    variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'custom';
  }>;
};

export type TMultiFileCodeBlockProps = {
  files: TFile[];
  className?: string;
  showLineNumbers?: boolean;
  enableLineHighlight?: boolean;
  enableLineHover?: boolean;
  maxHeight?: string;
};

export function MultiFileCodeBlock({
  files,
  className,
  showLineNumbers = true,
  enableLineHighlight = false,
  enableLineHover = false,
  maxHeight = '400px',
}: TMultiFileCodeBlockProps) {
  const [activeFileIndex, setActiveFileIndex] = useState(0);

  return (
    <div className={cn('rounded-xl overflow-hidden border border-zinc-200 dark:border-[#333333] shadow-sm', className)}>
      {/* Enhanced File Tabs */}
      <div className="relative bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-50 dark:from-[#111111] dark:via-[#0A0A0A] dark:to-[#111111] border-b border-zinc-200 dark:border-[#333333]">
        <div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap">
          {files.map((file, index) => {
            const IconComponent = getLanguageIcon(file.language);
            const isActive = activeFileIndex === index;
            
            return (
              <button
                key={file.name}
                onClick={() => setActiveFileIndex(index)}
                className={cn(
                  'group relative flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  'hover:bg-white/60 dark:hover:bg-[#0A0A0A]/60',
                  'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500/50',
                  'border-r border-zinc-200/60 dark:border-[#333333]/60',
                  'flex-shrink-0 whitespace-nowrap',
                  isActive
                    ? 'bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                )}
              >
                {/* File Icon */}
                <div className={cn(
                  'flex-shrink-0 transition-colors duration-200',
                  isActive 
                    ? 'text-gray-600 dark:text-gray-400' 
                    : 'text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'
                )}>
                  <IconComponent size={12} />
                </div>
                
                {/* File Name */}
                <span className="truncate font-medium min-w-0">
                  {file.name}
                </span>
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-400 dark:to-gray-500 rounded-t-sm" />
                )}
                
                {/* Subtle hover effect */}
                <div className={cn(
                  'absolute inset-0 rounded-t-lg transition-opacity duration-200',
                  'bg-gradient-to-b from-white/20 to-transparent dark:from-white/5 dark:to-transparent',
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                )} />
              </button>
            );
          })}
        </div>
        
        {/* Gradient fade effects */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-zinc-50 to-transparent dark:from-[#111111] dark:to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-zinc-50 to-transparent dark:from-[#111111] dark:to-transparent pointer-events-none" />
      </div>

      {/* Active File Code Block */}
      <div className="bg-white dark:bg-[#0A0A0A]">
        <CodeBlock
          code={files[activeFileIndex].code}
          language={files[activeFileIndex].language}
          fileName={files[activeFileIndex].name}
          badges={files[activeFileIndex].badges}
          showLineNumbers={showLineNumbers}
          enableLineHighlight={enableLineHighlight}
          enableLineHover={enableLineHover}
          maxHeight={maxHeight}
        />
      </div>
    </div>
  );
}
