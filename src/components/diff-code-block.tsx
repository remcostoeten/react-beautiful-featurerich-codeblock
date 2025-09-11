'use client';

import { cn, CodeBlock } from './code-block';
import { useState } from 'react';
import { GitBranch, ArrowLeftRight } from 'lucide-react';

export type TDiffLine = {
  content: string;
  type: 'added' | 'removed' | 'unchanged';
  oldNumber?: number;
  newNumber?: number;
};

export type TDiffCodeBlockProps = {
  fileName?: string;
  oldCode: string;
  newCode: string;
  language: string;
  className?: string;
  maxHeight?: string;
  showBottomFade?: boolean;
  width?: string;
  height?: string;
};

function computeDiff(oldCode: string, newCode: string): TDiffLine[] {
  const oldLines = oldCode.split('\n');
  const newLines = newCode.split('\n');
  const diff: TDiffLine[] = [];
  let oldLineNumber = 1;
  let newLineNumber = 1;

  for (let i = 0; i < Math.max(oldLines.length, newLines.length); i++) {
    const oldLine = oldLines[i];
    const newLine = newLines[i];

    if (oldLine === undefined) {
      diff.push({
        content: newLine,
        type: 'added',
        newNumber: newLineNumber++,
      });
    } else if (newLine === undefined) {
      diff.push({
        content: oldLine,
        type: 'removed',
        oldNumber: oldLineNumber++,
      });
    } else if (oldLine !== newLine) {
      diff.push({
        content: oldLine,
        type: 'removed',
        oldNumber: oldLineNumber++,
      });
      diff.push({
        content: newLine,
        type: 'added',
        newNumber: newLineNumber++,
      });
    } else {
      diff.push({
        content: oldLine,
        type: 'unchanged',
        oldNumber: oldLineNumber++,
        newNumber: newLineNumber++,
      });
    }
  }

  return diff;
}

function formatDiffForDisplay(diff: TDiffLine[]): { code: string; highlightedLines: number[] } {
  const code = diff.map(line => line.content).join('\n');
  const highlightedLines = diff.reduce((acc, line, index) => {
    if (line.type !== 'unchanged') {
      acc.push(index + 1);
    }
    return acc;
  }, [] as number[]);
  
  return { code, highlightedLines };
}

export function DiffCodeBlock({
  fileName,
  oldCode,
  newCode,
  language,
  className,
  maxHeight = '400px',
  showBottomFade = true,
  width,
  height,
}: TDiffCodeBlockProps) {
  const [mode, setMode] = useState<'split' | 'unified'>('unified');
  const [showDiffHighlight, setShowDiffHighlight] = useState(false);
  const diff = computeDiff(oldCode, newCode);
  const addedLines = diff.filter(line => line.type === 'added').length;
  const removedLines = diff.filter(line => line.type === 'removed').length;

  if (mode === 'unified') {
    const { code, highlightedLines } = formatDiffForDisplay(diff);
    
    return (
      <div className={cn('rounded-xl overflow-hidden border border-zinc-200 dark:border-[#333333]', className)} style={{ width, height }}>
        <div className="flex justify-between items-center px-4 py-2.5 bg-white dark:bg-[#0A0A0A]">
          <div className="flex items-center gap-3">
            <GitBranch size={16} className="text-zinc-600 dark:text-zinc-400" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {fileName || 'Diff View'}
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                +{addedLines}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                -{removedLines}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDiffHighlight(!showDiffHighlight)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors",
                showDiffHighlight
                  ? "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-[#111111]"
              )}
            >
              <div className={cn("w-2 h-2 rounded-full", showDiffHighlight ? "bg-gray-500" : "bg-zinc-400")} />
              Highlight Diff
            </button>
            <button
              onClick={() => setMode('split')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-[#111111] rounded-md transition-colors"
            >
              <ArrowLeftRight size={14} />
              Split View
            </button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#0A0A0A]">
          <CodeBlock
            code={diff.map(line => {
              const prefix = line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  ';
              return prefix + line.content;
            }).join('\n')}
            language="diff"
            showLineNumbers
            maxHeight={maxHeight}
            enableLineHighlight={false}
            showBottomFade={showBottomFade}
          />
        </div>
      </div>
    );
  }

  // Calculate which lines are different for highlighting
  const oldDiffLines = diff.reduce((acc, line, index) => {
    if (line.type === 'removed' && line.oldNumber) {
      acc.push(line.oldNumber);
    }
    return acc;
  }, [] as number[]);
  
  const newDiffLines = diff.reduce((acc, line, index) => {
    if (line.type === 'added' && line.newNumber) {
      acc.push(line.newNumber);
    }
    return acc;
  }, [] as number[]);

  return (
    <div className={cn('rounded-xl overflow-hidden border border-zinc-200 dark:border-[#333333]', className)} style={{ width, height }}>
      <div className="flex justify-between items-center px-4 py-2.5 bg-white dark:bg-[#0A0A0A]">
        <div className="flex items-center gap-3">
          <GitBranch size={16} className="text-zinc-600 dark:text-zinc-400" />
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {fileName || 'Diff View'}
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
              +{addedLines}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
              -{removedLines}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDiffHighlight(!showDiffHighlight)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors",
              showDiffHighlight
                ? "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-[#111111]"
            )}
          >
            <div className={cn("w-2 h-2 rounded-full", showDiffHighlight ? "bg-gray-500" : "bg-zinc-400")} />
            Highlight Diff
          </button>
          <button
            onClick={() => setMode('unified')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-[#111111] rounded-md transition-colors"
          >
            <GitBranch size={14} />
            Unified View
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 divide-x divide-zinc-200 dark:divide-[#333333]">
        <div className="bg-white dark:bg-[#0A0A0A] relative">
          <div className="px-4 py-2 bg-red-50 dark:bg-red-950/20">
            <span className="text-sm font-medium text-red-700 dark:text-red-400">Before</span>
          </div>
          <div>
            <CodeBlock
              code={oldCode}
              language={language}
              showLineNumbers
              maxHeight={maxHeight}
              enableLineHighlight={showDiffHighlight}
              initialHighlightedLines={showDiffHighlight ? oldDiffLines : []}
              showBottomFade={showBottomFade}
            />
          </div>
        </div>
        <div className="bg-white dark:bg-[#0A0A0A] relative">
          <div className="px-4 py-2 bg-green-50 dark:bg-green-950/20">
            <span className="text-sm font-medium text-green-700 dark:text-green-400">After</span>
          </div>
          <div>
            <CodeBlock
              code={newCode}
              language={language}
              showLineNumbers
              maxHeight={maxHeight}
              enableLineHighlight={showDiffHighlight}
              initialHighlightedLines={showDiffHighlight ? newDiffLines : []}
              showBottomFade={showBottomFade}
            />
          </div>
          </div>
      </div>
    </div>
  );
}
