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
  showInnerFileName?: boolean;
  showMetaInfo?: boolean;
  showIcon?: boolean;
};

export function MultiFileCodeBlock({
  files,
  className,
  showLineNumbers = true,
  enableLineHighlight = false,
  enableLineHover = false,
  maxHeight = '400px',
  showInnerFileName = false,
  showMetaInfo = false,
  showIcon = false,
}: TMultiFileCodeBlockProps) {
  const [activeFileIndex, setActiveFileIndex] = useState(0);

  return (
    <div className={cn('rounded-xl overflow-hidden border border-zinc-200 dark:border-[#333333] shadow-sm', className)}>
      <div className="relative bg-white dark:bg-[#0A0A0A] border-b border-zinc-200 dark:border-[#333333]">
        <div className="flex overflow-x-auto whitespace-nowrap">
          {files.map((file, index) => {
            const IconComponent = getLanguageIcon(file.language);
            const isActive = activeFileIndex === index;
            const base = 'relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors border-b-2 flex-shrink-0';
            const activeCls = 'border-[var(--foreground)] text-[var(--foreground)]';
            const inactiveCls = 'border-transparent text-[var(--foreground)]/60 hover:text-[var(--foreground)]';
            return (
              <button
                key={file.name}
                onClick={() => setActiveFileIndex(index)}
                className={cn(base, isActive ? activeCls : inactiveCls)}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="shrink-0 text-zinc-500 dark:text-zinc-500">
                    <IconComponent size={12} />
                  </span>
                  <span className="truncate font-medium">{file.name}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-[#0A0A0A]">
        <CodeBlock
          code={files[activeFileIndex].code}
          language={files[activeFileIndex].language}
          fileName={showInnerFileName ? files[activeFileIndex].name : undefined}
          badges={files[activeFileIndex].badges}
          showLineNumbers={showLineNumbers}
          enableLineHighlight={enableLineHighlight}
          enableLineHover={enableLineHover}
          maxHeight={maxHeight}
          showMetaInfo={showMetaInfo}
          showIcon={showIcon}
        />
      </div>
    </div>
  );
}
