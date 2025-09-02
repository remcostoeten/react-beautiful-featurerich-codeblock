'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { 
  ChevronDown, 
  Search, 
  Filter,
  FolderTree,
  Settings,
  X
} from 'lucide-react';
import { ContextMenuProvider } from './context-menu-provider';
import { FileTree } from './file-tree';
import type { 
  TFileExplorerSidebarProps, 
  TFileTreeNode, 
  TFolderNode 
} from '@/types/file-tree';

const cn = (...inputs: string[]) => clsx(...inputs);

type TProps = TFileExplorerSidebarProps;

export function FileExplorerSidebar({
  tree,
  menuConfig,
  enableContextMenu = true,
  onAction,
  onNodeSelect,
  selectedNodeId,
  className,
  theme = 'dark'
}: TProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter tree based on search query
  const filteredTree = useMemo(() => {
    if (!searchQuery.trim()) return tree;

    function filterNodes(nodes: TFileTreeNode[]): TFileTreeNode[] {
      return nodes.reduce((acc, node) => {
        const matchesQuery = node.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (node.type === 'folder') {
          const filteredChildren = filterNodes(node.children);
          if (matchesQuery || filteredChildren.length > 0) {
            acc.push({
              ...node,
              children: filteredChildren,
              isExpanded: true // Auto-expand folders with matches
            });
          }
        } else if (matchesQuery) {
          acc.push(node);
        }
        
        return acc;
      }, [] as TFileTreeNode[]);
    }

    return filterNodes(tree);
  }, [tree, searchQuery]);

  const handleNodeClick = useCallback((node: TFileTreeNode) => {
    onNodeSelect?.(node);
    
    // Handle default action based on node type
    if (node.type === 'file') {
      onAction?.('open', node);
    }
  }, [onNodeSelect, onAction]);

  const handleNodeExpand = useCallback((node: TFolderNode, expanded: boolean) => {
    // This would typically update the tree state in the parent component
    // For now, we'll just trigger the action callback
    onAction?.(expanded ? 'expand' : 'collapse', node);
  }, [onAction]);

  const sidebarAnimations = {
    collapsed: {
      width: 48
    },
    expanded: {
      width: 320
    }
  };

  const contentAnimations = {
    hidden: {
      opacity: 0,
      x: -10
    },
    visible: {
      opacity: 1,
      x: 0
    }
  };

  return (
    <ContextMenuProvider enabled={enableContextMenu} theme={theme}>
      <motion.div
        initial={false}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarAnimations}
        className={cn(
          'flex flex-col h-full border-r transition-colors duration-200',
          theme === 'dark' 
            ? 'bg-[#0a0a0a] border-[#333333]' 
            : 'bg-white border-zinc-200',
          className || ''
        )}
      >
        {/* Header */}
        <div className={cn(
          'flex items-center justify-between p-3 border-b',
          theme === 'dark' ? 'border-[#333333]' : 'border-zinc-200'
        )}>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentAnimations}
                className="flex items-center gap-2 min-w-0 flex-1"
              >
                <FolderTree 
                  size={20} 
                  className={cn(
                    'flex-shrink-0',
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  )} 
                />
                <span className={cn(
                  'font-medium text-sm truncate',
                  theme === 'dark' ? 'text-zinc-200' : 'text-zinc-700'
                )}>
                  Explorer
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-1">
            {!isCollapsed && (
              <>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={cn(
                    'p-1.5 rounded-md transition-colors',
                    theme === 'dark'
                      ? 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-black/5',
                    isSearchOpen ? (theme === 'dark' ? 'bg-white/10' : 'bg-black/10') : ''
                  )}
                  title="Search files"
                >
                  <Search size={16} />
                </button>
                
                <button
                  className={cn(
                    'p-1.5 rounded-md transition-colors',
                    theme === 'dark'
                      ? 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-black/5'
                  )}
                  title="Filter options"
                >
                  <Filter size={16} />
                </button>
              </>
            )}

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                'p-1.5 rounded-md transition-all duration-200',
                theme === 'dark'
                  ? 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-black/5'
              )}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && !isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className={cn(
                'p-3 border-b',
                theme === 'dark' ? 'border-[#333333]' : 'border-zinc-200'
              )}>
                <div className="relative">
                  <Search 
                    size={14} 
                    className={cn(
                      'absolute left-3 top-1/2 -translate-y-1/2',
                      theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                    )} 
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search files..."
                    className={cn(
                      'w-full pl-9 pr-8 py-2 text-sm rounded-md border transition-colors',
                      'focus:outline-none focus:ring-1 focus:ring-blue-500',
                      theme === 'dark'
                        ? 'bg-[#1a1a1a] border-[#333333] text-zinc-200 placeholder:text-zinc-500'
                        : 'bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
                    )}
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className={cn(
                        'absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm transition-colors',
                        theme === 'dark'
                          ? 'text-zinc-500 hover:text-zinc-300'
                          : 'text-zinc-400 hover:text-zinc-600'
                      )}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* File Tree */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentAnimations}
                className="h-full overflow-auto"
              >
                <div className="p-2">
                  {filteredTree.length > 0 ? (
                    <FileTree
                      nodes={filteredTree}
                      onNodeClick={handleNodeClick}
                      onNodeExpand={handleNodeExpand}
                      selectedNodeId={selectedNodeId}
                      menuConfig={menuConfig}
                      theme={theme}
                      className="min-h-0"
                    />
                  ) : searchQuery ? (
                    <div className={cn(
                      'flex flex-col items-center justify-center p-8 text-center',
                      theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                    )}>
                      <Search size={24} className="mb-2 opacity-50" />
                      <p className="text-sm font-medium mb-1">No results found</p>
                      <p className="text-xs">Try a different search term</p>
                    </div>
                  ) : (
                    <div className={cn(
                      'flex flex-col items-center justify-center p-8 text-center',
                      theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                    )}>
                      <FolderTree size={24} className="mb-2 opacity-50" />
                      <p className="text-sm">No files to display</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed state icon */}
          {isCollapsed && (
            <div className="flex items-center justify-center py-4">
              <FolderTree 
                size={20} 
                className={cn(
                  theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'
                )} 
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={cn(
          'p-3 border-t',
          theme === 'dark' ? 'border-[#333333]' : 'border-zinc-200'
        )}>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentAnimations}
                className="flex items-center justify-between"
              >
                <span className={cn(
                  'text-xs',
                  theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                )}>
                  {tree.length} items
                </span>
                <button
                  className={cn(
                    'p-1 rounded-sm transition-colors',
                    theme === 'dark'
                      ? 'text-zinc-500 hover:text-zinc-300'
                      : 'text-zinc-400 hover:text-zinc-600'
                  )}
                  title="Settings"
                >
                  <Settings size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </ContextMenuProvider>
  );
}
