// Shared interface definitions
export interface BreadcrumbItem {
  label: string;
  href?: string;
  disabled?: boolean;
  icon?: string;
}

export interface Message {
  id: string;
  content: string;
  author: string;
  sender?: string;
  avatar?: string;
  timestamp: Date;
  type?: 'text' | 'image' | 'file';
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage?: Message;
  unreadCount?: number;
  avatar?: string;
  isOnline?: boolean;
  lastMessageTime?: Date;
}

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  status?: 'online' | 'away' | 'busy' | 'offline';
}

export interface PinnedMessage {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
}

export interface CarouselItem {
  id: string;
  title?: string;
  content: string;
  image?: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: Date;
  type?: string;
}

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  expanded?: boolean;
}

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  shortcut?: string;
  action: () => void;
}

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  action?: () => void;
}

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video' | 'audio' | 'file';
  title?: string;
  thumbnail?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  active?: boolean;
}

export interface Step {
  label: string;
  description?: string;
  completed?: boolean;
  disabled?: boolean;
}

export interface Tab {
  id: string;
  label: string;
  content?: string;
  disabled?: boolean;
}

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface Row {
  [key: string]: any;
}

export interface Action {
  id: string;
  label: string;
  icon?: string;
  variant?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
  action: () => void;
}

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  duration?: number;
}