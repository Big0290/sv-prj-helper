// ===== MAIN LIBRARY EXPORTS =====
// All UI components, hooks, and utilities
export * from './ui/index.js';

// ===== ADDITIONAL HOOKS =====
// Legacy hooks not included in UI system
export * from './hooks/index.js';

// ===== ADDITIONAL SHARED TYPES =====
// Export types that are not already exported by UI components
export type {
  BreadcrumbItem,
  Message,
  ChatRoom,
  SearchResult,
  Reaction,
  User,
  PinnedMessage,
  CommandItem,
  ContextMenuItem,
  MediaItem,
  Step,
  Tab,
  Action
} from './types/shared.js';

// ===== STYLES =====
// CSS theme exports are handled via package.json exports field
