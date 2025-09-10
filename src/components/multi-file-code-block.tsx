'use client';

import { useState } from 'react';
import { CodeBlock } from './code-block';
import { cn } from './code-block';

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
    <div className={cn('rounded-xl overflow-hidden border border-zinc-200 dark:border-[#333333]', className)}>
      {/* File Tabs */}
      <div className="flex overflow-x-auto bg-zinc-50 dark:bg-[#111111] border-b border-zinc-200 dark:border-[#333333]">
        {files.map((file, index) => (
          <button
            key={file.name}
            onClick={() => setActiveFileIndex(index)}
            className={cn(
              'px-4 py-2 text-sm font-medium border-r border-zinc-200 dark:border-[#333333] transition-colors',
              'hover:bg-zinc-100 dark:hover:bg-[#0A0A0A]',
              'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500',
              activeFileIndex === index
                ? 'bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100'
                : 'bg-zinc-50 dark:bg-[#111111] text-zinc-600 dark:text-zinc-400'
            )}
          >
            {file.name}
          </button>
        ))}
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
