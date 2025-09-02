/**
 * File Tree and Context Menu Types
 * 
 * Type definitions for file explorer sidebar with configurable context menus
 */

import { ReactNode } from 'react';

export type TNodeType = 'file' | 'folder';

export type TFileNode = {
  id: string;
  type: 'file';
  name: string;
  extension?: string;
  size?: number;
  lastModified?: Date;
  content?: string;
  language?: string;
  path: string;
};

export type TFolderNode = {
  id: string;
  type: 'folder';
  name: string;
  children: TFileTreeNode[];
  isExpanded?: boolean;
  path: string;
};

export type TFileTreeNode = TFileNode | TFolderNode;

export type TContextActionSeparator = {
  separator: true;
};

export type TContextActionItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  handler: (node: TFileTreeNode) => void | Promise<void>;
  separator?: false;
};

export type TContextAction = TContextActionItem | TContextActionSeparator;

export type TContextMenuConfig = {
  [K in TNodeType]: TContextAction[];
};

export type TPosition = {
  x: number;
  y: number;
};

export type TContextMenuState = {
  isOpen: boolean;
  position: TPosition;
  node: TFileTreeNode | null;
  actions: TContextAction[];
};

export type TFileTreeProps = {
  nodes: TFileTreeNode[];
  onNodeClick?: (node: TFileTreeNode) => void;
  onNodeExpand?: (node: TFolderNode, expanded: boolean) => void;
  selectedNodeId?: string;
  className?: string;
};

export type TFileExplorerSidebarProps = {
  tree: TFileTreeNode[];
  menuConfig: TContextMenuConfig;
  enableContextMenu?: boolean;
  onAction?: (actionId: string, node: TFileTreeNode) => void;
  onNodeSelect?: (node: TFileTreeNode) => void;
  selectedNodeId?: string;
  className?: string;
  theme?: 'light' | 'dark';
};

export type TContextMenuProps = {
  isOpen: boolean;
  position: TPosition;
  actions: TContextAction[];
  onClose: () => void;
  theme?: 'light' | 'dark';
  className?: string;
};
