'use client';

import { useState, useCallback, memo, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { 
  ChevronDown, 
  ChevronRight, 
  File, 
  Folder, 
  FolderOpen 
} from 'lucide-react';
import { useContextMenu } from './context-menu-provider';
import type { 
  TFileTreeNode, 
  TFolderNode, 
  TFileTreeProps, 
  TContextMenuConfig 
} from '@/types/file-tree';

const cn = (...inputs: string[]) => clsx(...inputs);

// Tree animations
const treeAnimations = {
  collapsed: {
    height: 0,
    opacity: 0
  },
  expanded: {
    height: 'auto',
    opacity: 1
  }
};

type TFileTreeNodeProps = {
  node: TFileTreeNode;
  level: number;
  isSelected: boolean;
  onNodeClick?: (node: TFileTreeNode) => void;
  onNodeExpand?: (node: TFolderNode, expanded: boolean) => void;
  menuConfig?: TContextMenuConfig;
  theme?: 'light' | 'dark';
};

const FileTreeNode = memo(function FileTreeNode({
  node,
  level,
  isSelected,
  onNodeClick,
  onNodeExpand,
  menuConfig,
  theme = 'dark'
}: TFileTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(node.type === 'folder' ? node.isExpanded ?? false : false);
  const [isFocused, setIsFocused] = useState(false);
  const contextMenu = useContextMenu();
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (menuConfig && contextMenu.enabled) {
      const rect = event.currentTarget.getBoundingClientRect();
      contextMenu.open(node, { x: event.clientX, y: event.clientY }, menuConfig);
    }
  }, [node, menuConfig, contextMenu]);

  const handleClick = useCallback(() => {
    onNodeClick?.(node);
    
    if (node.type === 'folder') {
      const newExpanded = !isExpanded;
      setIsExpanded(newExpanded);
      onNodeExpand?.(node, newExpanded);
    }
  }, [node, isExpanded, onNodeClick, onNodeExpand]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleClick();
        break;
      case 'ArrowRight':
        if (node.type === 'folder' && !isExpanded) {
          event.preventDefault();
          setIsExpanded(true);
          onNodeExpand?.(node, true);
        }
        break;
      case 'ArrowLeft':
        if (node.type === 'folder' && isExpanded) {
          event.preventDefault();
          setIsExpanded(false);
          onNodeExpand?.(node, false);
        }
        break;
    }
  }, [node, isExpanded, handleClick, onNodeExpand]);

  const indentLevel = level * 16; // 16px per level
  
  const nodeIcon = useMemo(() => {
    if (node.type === 'folder') {
      return isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />;
    }
    return <File size={16} />;
  }, [node.type, isExpanded]);

  const expansionIcon = node.type === 'folder' ? (
    <motion.div
      initial={false}
      animate={{ rotate: isExpanded ? 90 : 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-center w-4 h-4"
    >
      <ChevronRight size={12} />
    </motion.div>
  ) : (
    <div className="w-4 h-4" />
  );

  return (
    <div>
      <div
        ref={nodeRef}
        className={cn(
          'group relative flex items-center gap-2 px-2 py-1.5 cursor-pointer transition-all duration-150 rounded-md select-none',
          'hover:bg-black/5 dark:hover:bg-white/5',
          'focus:outline-none focus:ring-1 focus:ring-blue-500/50',
          isSelected ? (
            theme === 'dark' 
              ? 'bg-blue-500/20 text-blue-300' 
              : 'bg-blue-500/10 text-blue-600'
          ) : '',
          isFocused ? 'ring-1 ring-blue-500/50' : ''
        )}
        style={{ paddingLeft: indentLevel + 8 }}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={0}
        role="treeitem"
        aria-expanded={node.type === 'folder' ? isExpanded : undefined}
        aria-selected={isSelected}
        aria-level={level + 1}
      >
        {expansionIcon}
        <span className={cn(
          'flex items-center justify-center w-4 h-4 text-zinc-500 dark:text-zinc-400 transition-colors',
          node.type === 'folder' && isExpanded ? 'text-blue-500 dark:text-blue-400' : ''
        )}>
          {nodeIcon}
        </span>
        <span className={cn(
          'flex-1 truncate text-sm font-medium transition-colors',
          theme === 'dark' ? 'text-zinc-200' : 'text-zinc-700',
          isSelected ? (
            theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
          ) : ''
        )}>
          {node.name}
        </span>
        
        {/* File extension badge */}
        {node.type === 'file' && node.extension && (
          <span className={cn(
            'px-1.5 py-0.5 text-xs font-mono rounded border transition-colors',
            theme === 'dark'
              ? 'text-zinc-400 border-zinc-600 bg-zinc-800/50'
              : 'text-zinc-500 border-zinc-300 bg-zinc-100'
          )}>
            {node.extension}
          </span>
        )}
      </div>

      {/* Render children for folders */}
      {node.type === 'folder' && (
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={treeAnimations}
              className="overflow-hidden"
            >
              <div className="py-1">
                {node.children.map((child) => (
                  <FileTreeNode
                    key={child.id}
                    node={child}
                    level={level + 1}
                    isSelected={false} // Will be handled by parent
                    onNodeClick={onNodeClick}
                    onNodeExpand={onNodeExpand}
                    menuConfig={menuConfig}
                    theme={theme}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
});

export function FileTree({
  nodes,
  onNodeClick,
  onNodeExpand,
  selectedNodeId,
  className,
  menuConfig,
  theme = 'dark'
}: TFileTreeProps & { 
  menuConfig?: TContextMenuConfig;
  theme?: 'light' | 'dark';
}) {
  const treeRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation between nodes
  useEffect(() => {
    function handleTreeKeyDown(event: KeyboardEvent) {
      if (!treeRef.current?.contains(event.target as Node)) return;

      const focusableElements = treeRef.current.querySelectorAll('[role="treeitem"]');
      const currentIndex = Array.from(focusableElements).indexOf(event.target as Element);

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          const nextIndex = currentIndex + 1;
          if (nextIndex < focusableElements.length) {
            (focusableElements[nextIndex] as HTMLElement).focus();
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          const prevIndex = currentIndex - 1;
          if (prevIndex >= 0) {
            (focusableElements[prevIndex] as HTMLElement).focus();
          }
          break;
        case 'Home':
          event.preventDefault();
          if (focusableElements.length > 0) {
            (focusableElements[0] as HTMLElement).focus();
          }
          break;
        case 'End':
          event.preventDefault();
          if (focusableElements.length > 0) {
            (focusableElements[focusableElements.length - 1] as HTMLElement).focus();
          }
          break;
      }
    }

    document.addEventListener('keydown', handleTreeKeyDown);
    return () => document.removeEventListener('keydown', handleTreeKeyDown);
  }, []);

  if (!nodes.length) {
    return (
      <div className={cn(
        'flex items-center justify-center p-8 text-sm',
        'text-zinc-400 dark:text-zinc-500',
        className || ''
      )}>
        No files or folders to display
      </div>
    );
  }

  return (
    <div 
      ref={treeRef}
      className={cn('space-y-0.5', className || '')}
      role="tree"
      aria-label="File explorer"
    >
      {nodes.map((node) => (
        <FileTreeNode
          key={node.id}
          node={node}
          level={0}
          isSelected={selectedNodeId === node.id}
          onNodeClick={onNodeClick}
          onNodeExpand={onNodeExpand}
          menuConfig={menuConfig}
          theme={theme}
        />
      ))}
    </div>
  );
}
