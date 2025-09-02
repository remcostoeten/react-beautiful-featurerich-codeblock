'use client';
import { useState, useCallback, lazy, Suspense } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  FolderPlus, 
  Download,
  Eye,
  EyeOff
} from 'lucide-react';
import { FileExplorerSidebar } from './file-explorer-sidebar';
import type { 
  TFileTreeNode, 
  TContextMenuConfig 
} from '@/types/file-tree';

// Lazy load the CodeBlock component for performance
const CodeBlock = lazy(() => import('./code-block').then(module => ({ default: module.CodeBlock })));

// Sample file tree data
const sampleTree: TFileTreeNode[] = [
  {
    id: 'src',
    type: 'folder',
    name: 'src',
    path: '/src',
    isExpanded: true,
    children: [
      {
        id: 'components',
        type: 'folder',
        name: 'components',
        path: '/src/components',
        isExpanded: false,
        children: [
          {
            id: 'button-tsx',
            type: 'file',
            name: 'Button.tsx',
            extension: 'tsx',
            path: '/src/components/Button.tsx',
            language: 'typescript',
            content: `import { ReactNode } from 'react';

type TProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
};

export function Button({ children, onClick, variant = 'primary', disabled }: TProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`px-4 py-2 rounded-lg transition-colors \${
        variant === 'primary' 
          ? 'bg-blue-500 hover:bg-blue-600 text-white' 
          : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
      } \${disabled ? 'opacity-50 cursor-not-allowed' : ''}\`}
    >
      {children}
    </button>
  );
}`
          },
          {
            id: 'modal-tsx',
            type: 'file',
            name: 'Modal.tsx',
            extension: 'tsx',
            path: '/src/components/Modal.tsx',
            language: 'typescript',
            content: `import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export function Modal({ isOpen, onClose, children, title }: TProps) {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}`
          }
        ]
      },
      {
        id: 'utils',
        type: 'folder',
        name: 'utils',
        path: '/src/utils',
        children: [
          {
            id: 'helpers-ts',
            type: 'file',
            name: 'helpers.ts',
            extension: 'ts',
            path: '/src/utils/helpers.ts',
            language: 'typescript',
            content: `export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}`
          }
        ]
      }
    ]
  },
  {
    id: 'package-json',
    type: 'file',
    name: 'package.json',
    extension: 'json',
    path: '/package.json',
    language: 'json',
    content: `{
  "name": "file-explorer-demo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "framer-motion": "^12.23.12",
    "lucide-react": "^0.542.0",
    "next": "15.5.2",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  }
}`
  },
  {
    id: 'readme-md',
    type: 'file',
    name: 'README.md',
    extension: 'md',
    path: '/README.md',
    language: 'markdown',
    content: `# File Explorer Demo

A beautiful file explorer with context menus built with React and TypeScript.

## Features

- 🗂️ Hierarchical file tree with expand/collapse
- 🖱️ Right-click context menus with configurable actions
- 🔍 Search functionality with live filtering
- ⌨️ Full keyboard navigation support
- 🎨 Light and dark theme support
- 📱 Responsive design with collapsible sidebar
- ✨ Smooth animations with Framer Motion
- ♿ Full accessibility support

## Usage

\`\`\`tsx
import { FileExplorerSidebar } from './components/file-explorer-sidebar';

function App() {
  return (
    <FileExplorerSidebar
      tree={fileTree}
      menuConfig={contextMenuConfig}
      onNodeSelect={(node) => console.log('Selected:', node)}
      onAction={(action, node) => console.log('Action:', action, node)}
    />
  );
}
\`\`\`

## Context Menu Configuration

Define custom actions for files and folders:

\`\`\`tsx
const menuConfig = {
  file: [
    { id: 'open', label: 'Open', handler: (node) => openFile(node) },
    { id: 'rename', label: 'Rename', handler: (node) => renameFile(node) },
    { id: 'delete', label: 'Delete', handler: (node) => deleteFile(node) }
  ],
  folder: [
    { id: 'expand', label: 'Expand', handler: (node) => expandFolder(node) },
    { id: 'new-file', label: 'New File', handler: (node) => createFile(node) }
  ]
};
\`\`\`
`
  }
];

// Context menu configuration
const contextMenuConfig: TContextMenuConfig = {
  file: [
    {
      id: 'open',
      label: 'Open',
      icon: <Eye size={14} />,
      shortcut: 'Enter',
      handler: (node) => console.log('Opening file:', node.name)
    },
    {
      id: 'rename',
      label: 'Rename',
      icon: <Edit3 size={14} />,
      shortcut: 'F2',
      handler: (node) => console.log('Renaming file:', node.name)
    },
    {
      id: 'copy',
      label: 'Copy',
      icon: <Copy size={14} />,
      shortcut: '⌘C',
      handler: (node) => console.log('Copying file:', node.name)
    },
    { separator: true },
    {
      id: 'download',
      label: 'Download',
      icon: <Download size={14} />,
      handler: (node) => console.log('Downloading file:', node.name)
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 size={14} />,
      shortcut: 'Del',
      handler: (node) => console.log('Deleting file:', node.name)
    }
  ],
  folder: [
    {
      id: 'new-file',
      label: 'New File',
      icon: <Plus size={14} />,
      handler: (node) => console.log('Creating new file in:', node.name)
    },
    {
      id: 'new-folder',
      label: 'New Folder',
      icon: <FolderPlus size={14} />,
      handler: (node) => console.log('Creating new folder in:', node.name)
    },
    { separator: true },
    {
      id: 'rename',
      label: 'Rename',
      icon: <Edit3 size={14} />,
      shortcut: 'F2',
      handler: (node) => console.log('Renaming folder:', node.name)
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 size={14} />,
      shortcut: 'Del',
      handler: (node) => console.log('Deleting folder:', node.name)
    }
  ]
};

export default function FileExplorerDemoView() {
  const [selectedNode, setSelectedNode] = useState<TFileTreeNode | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleNodeSelect = useCallback((node: TFileTreeNode) => {
    setSelectedNode(node);
  }, []);

  const handleAction = useCallback((actionId: string, node: TFileTreeNode) => {
    console.log(`Action ${actionId} triggered on`, node);
    
    // Handle specific actions
    switch (actionId) {
      case 'open':
        if (node.type === 'file') {
          setSelectedNode(node);
        }
        break;
      case 'expand':
      case 'collapse':
        // Handle folder expansion/collapse
        break;
      default:
        console.log(`Unhandled action: ${actionId}`);
    }
  }, []);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  }, [isDarkMode]);

  return (
    <div className="h-screen flex bg-white dark:bg-[#0a0a0a] transition-colors">
      {/* Sidebar */}
      <FileExplorerSidebar
        tree={sampleTree}
        menuConfig={contextMenuConfig}
        enableContextMenu={true}
        onNodeSelect={handleNodeSelect}
        onAction={handleAction}
        selectedNodeId={selectedNode?.id}
        theme={isDarkMode ? 'dark' : 'light'}
        className="flex-shrink-0"
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-zinc-200 dark:border-[#333333] p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                File Explorer Demo
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Right-click on files and folders to see context menus
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-[#333333] 
                         bg-white dark:bg-[#1a1a1a] text-zinc-900 dark:text-zinc-100
                         hover:bg-zinc-50 dark:hover:bg-[#222222] transition-colors"
            >
              {isDarkMode ? <Eye size={16} /> : <EyeOff size={16} />}
              <span className="ml-2">{isDarkMode ? 'Light' : 'Dark'} Mode</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {selectedNode && selectedNode.type === 'file' && selectedNode.content ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {selectedNode.name}
                </h2>
                <span className="px-2 py-1 text-xs font-mono rounded border border-zinc-300 dark:border-[#333333] 
                               bg-zinc-100 dark:bg-[#1a1a1a] text-zinc-600 dark:text-zinc-400">
                  {selectedNode.extension || selectedNode.language}
                </span>
              </div>
              
              <Suspense 
                fallback={
                  <div className="flex items-center justify-center p-12 rounded-lg border border-zinc-200 dark:border-[#333333]">
                    <div className="text-zinc-500 dark:text-zinc-400">Loading code block...</div>
                  </div>
                }
              >
                <CodeBlock
                  code={selectedNode.content}
                  language={selectedNode.language || 'text'}
                  fileName={selectedNode.name}
                  showLineNumbers
                  enableLineHighlight
                  showIcon
                  badges={[
                    { text: selectedNode.language || 'Text', variant: 'primary' },
                    { text: 'Demo', variant: 'secondary' }
                  ]}
                  onCopy={(code) => console.log('Code copied:', code.length, 'characters')}
                />
              </Suspense>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl opacity-20">📁</div>
                <div>
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Select a file to view its content
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                    Click on any file in the sidebar to display its code with syntax highlighting.
                    Right-click on files and folders to access context menus.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export { FileExplorerDemoView };
