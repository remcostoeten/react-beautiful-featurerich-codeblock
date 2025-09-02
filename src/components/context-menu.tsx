'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import type { TContextMenuProps, TContextAction } from '@/types/file-tree';

const cn = (...inputs: string[]) => clsx(...inputs);

const contextMenuAnimations = {
  initial: { 
    opacity: 0, 
    scale: 0.95, 
    y: -10
  },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: -5
  }
};

export function ContextMenu({ 
  isOpen, 
  position, 
  actions, 
  onClose, 
  theme = 'dark', 
  className 
}: TContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [returnFocusElement, setReturnFocusElement] = useState<HTMLElement | null>(null);

  // Store the element that was focused before opening the menu
  useEffect(() => {
    if (isOpen) {
      setReturnFocusElement(document.activeElement as HTMLElement);
      setFocusedIndex(0); // Focus first item when opening
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        onClose();
        break;
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => {
          const nextIndex = prev + 1;
          return nextIndex >= actions.length ? 0 : nextIndex;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => {
          const prevIndex = prev - 1;
          return prevIndex < 0 ? actions.length - 1 : prevIndex;
        });
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < actions.length) {
          const action = actions[focusedIndex];
          if (!action.separator && !action.disabled) {
            // Note: Node should be passed from the parent component that manages context state
            // For now, we'll skip execution since we don't have the node context here
            onClose();
          }
        }
        break;
      case 'Tab':
        event.preventDefault();
        break;
    }
  }, [isOpen, actions, focusedIndex, onClose]);

  // Handle click outside to close
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  // Set up event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent context menu from showing
      document.addEventListener('contextmenu', preventDefault);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('contextmenu', preventDefault);
    };
  }, [isOpen, handleKeyDown, handleClickOutside]);

  // Return focus when menu closes
  useEffect(() => {
    if (!isOpen && returnFocusElement) {
      returnFocusElement.focus();
      setReturnFocusElement(null);
    }
  }, [isOpen, returnFocusElement]);

  function preventDefault(event: Event) {
    event.preventDefault();
  }

  function handleActionClick(action: TContextAction) {
    if (action.separator || action.disabled) return;
    // Note: Node should be passed from the parent component that manages context state
    // For now, we'll skip execution since we don't have the node context here
    onClose();
  }

  // Calculate position to ensure menu stays within viewport
  function getAdjustedPosition() {
    if (!menuRef.current) return position;

    const menuRect = menuRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let { x, y } = position;

    // Adjust horizontal position
    if (x + menuRect.width > viewport.width) {
      x = viewport.width - menuRect.width - 8; // 8px padding from edge
    }

    // Adjust vertical position
    if (y + menuRect.height > viewport.height) {
      y = viewport.height - menuRect.height - 8; // 8px padding from edge
    }

    // Ensure minimum distance from edges
    x = Math.max(8, x);
    y = Math.max(8, y);

    return { x, y };
  }

  if (!isOpen) return null;

  const adjustedPosition = getAdjustedPosition();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-transparent"
            onClick={onClose}
          />
          
          {/* Context menu */}
          <motion.div
            ref={menuRef}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={contextMenuAnimations}
            className={cn(
              'fixed z-50 min-w-48 rounded-lg border shadow-lg',
              theme === 'dark' 
                ? 'bg-[#1a1a1a] border-[#333333] text-zinc-200' 
                : 'bg-white border-zinc-200 text-zinc-900',
              className || ''
            )}
            style={{
              left: adjustedPosition.x,
              top: adjustedPosition.y,
            }}
            role="menu"
            aria-orientation="vertical"
          >
            <div className="py-1">
              {actions.map((action, index) => {
                if (action.separator) {
                  return (
                    <div 
                      key={`separator-${index}`}
                      className={cn(
                        'my-1 h-px',
                        theme === 'dark' ? 'bg-[#333333]' : 'bg-zinc-200'
                      )} 
                    />
                  );
                }

                return (
                  <button
                    key={action.id}
                    onClick={() => handleActionClick(action)}
                    disabled={action.disabled}
                    className={cn(
                      'relative flex w-full items-center gap-3 px-3 py-2 text-sm transition-colors',
                      'focus:outline-none',
                      theme === 'dark' 
                        ? 'hover:bg-[#2a2a2a] focus:bg-[#2a2a2a]' 
                        : 'hover:bg-zinc-100 focus:bg-zinc-100',
                      action.disabled 
                        ? (theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400')
                        : (theme === 'dark' ? 'text-zinc-200' : 'text-zinc-900'),
                      focusedIndex === index ? (
                        theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-zinc-100'
                      ) : ''
                    )}
                    role="menuitem"
                    tabIndex={-1}
                    aria-disabled={action.disabled}
                  >
                    {action.icon && (
                      <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                        {action.icon}
                      </span>
                    )}
                    <span className="flex-grow text-left">{action.label}</span>
                    {action.shortcut && (
                      <span className={cn(
                        'text-xs',
                        theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                      )}>
                        {action.shortcut}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
