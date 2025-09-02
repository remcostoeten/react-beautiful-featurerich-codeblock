'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ContextMenu } from './context-menu';
import type { 
  TContextMenuState, 
  TFileTreeNode, 
  TPosition, 
  TContextMenuConfig,
  TNodeType 
} from '@/types/file-tree';

type TContextMenuContext = {
  state: TContextMenuState;
  open: (node: TFileTreeNode, position: TPosition, config: TContextMenuConfig) => void;
  close: () => void;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
};

type TProps = {
  children: ReactNode;
  enabled?: boolean;
  theme?: 'light' | 'dark';
};

const ContextMenuContext = createContext<TContextMenuContext | null>(null);

export function ContextMenuProvider({ children, enabled = true, theme = 'dark' }: TProps) {
  const [state, setState] = useState<TContextMenuState>({
    isOpen: false,
    position: { x: 0, y: 0 },
    node: null,
    actions: []
  });
  
  const [isEnabled, setIsEnabled] = useState(enabled);

  const open = useCallback((
    node: TFileTreeNode, 
    position: TPosition, 
    config: TContextMenuConfig
  ) => {
    if (!isEnabled) return;

    const nodeType: TNodeType = node.type;
    const actions = config[nodeType] || [];
    
    
    setState({
      isOpen: true,
      position,
      node,
      actions: actions.map(action => 
        action.separator 
          ? action
          : {
              ...action,
              handler: () => action.handler(node)
            }
      )
    });
  }, [isEnabled]);

  const close = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  const setEnabled = useCallback((enabled: boolean) => {
    setIsEnabled(enabled);
    if (!enabled && state.isOpen) {
      close();
    }
  }, [state.isOpen, close]);

  const contextValue: TContextMenuContext = {
    state,
    open,
    close,
    enabled: isEnabled,
    setEnabled
  };

  return (
    <ContextMenuContext.Provider value={contextValue}>
      {children}
      {typeof window !== 'undefined' && createPortal(
        <ContextMenu
          isOpen={state.isOpen}
          position={state.position}
          actions={state.actions}
          onClose={close}
          theme={theme}
        />,
        document.body
      )}
    </ContextMenuContext.Provider>
  );
}

export function useContextMenu() {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error('useContextMenu must be used within a ContextMenuProvider');
  }
  return context;
}
