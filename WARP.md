# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Beautiful Code Block Component** for React/Next.js - a feature-rich, customizable code display component with syntax highlighting, search functionality, keyboard shortcuts, and interactive features. The project serves as both a reusable component library and a demo/documentation site.

**Key Features:**
- Unified syntax highlighting with language-specific icons
- Advanced search and line highlighting
- Keyboard shortcuts (Cmd/Ctrl+C copy, Cmd/Ctrl+F search, Cmd/Ctrl+G jump to line)
- Custom badge system with variants
- Smooth animations and transitions
- Copy-to-clipboard with toast notifications
- Collapsible/expandable code blocks

**Live Demo:** https://codeblock.remcostoeten.com/

## Development Commands

```bash
# Install dependencies (project uses pnpm)
pnpm install

# Start development server with Turbopack
pnpm dev

# Production build and start
pnpm build
pnpm start

# Linting
pnpm lint
```

**Note:** This project uses **Next.js 15** with **React 19 RC** and **pnpm** as the package manager. The dev server uses Turbopack for faster builds.

## Architecture & Project Structure

```
src/
├── app/                          # Next.js 13+ app directory
│   ├── core/                     # Core configuration & types
│   │   ├── config.ts             # App config (author, repo links, etc.)
│   │   └── types.d.ts            # Global type definitions
│   ├── layout.tsx                # Root layout with fonts & metadata
│   ├── page.tsx                  # Main demo page
│   └── globals.css               # Global styles
├── components/
│   ├── code-block/               # 🎯 CORE COMPONENT
│   │   ├── code-block.tsx        # Main CodeBlock component
│   │   ├── animations.ts         # Framer Motion variants
│   │   ├── custom-theme.ts       # Syntax highlighting theme
│   │   ├── icons.tsx             # Language-specific icons
│   │   ├── button.tsx            # Reusable button component
│   │   ├── cn.ts                 # Tailwind class utility
│   │   └── ...                   # Other utilities
│   ├── docs/                     # Documentation components
│   └── ui/                       # Shared UI components
```

## CodeBlock Component Architecture

### Core API (CodeBlockProps)
The main component accepts these essential props:

```typescript
type CodeBlockProps = {
  code: string;                           // Required: source code
  language: string;                       // Syntax highlighting language
  fileName?: string;                      // Optional file name display
  badges?: Badge[];                       // Custom badges array
  showLineNumbers?: boolean;              // Enable line numbers
  enableLineHighlight?: boolean;          // Interactive line highlighting
  showMetaInfo?: boolean;                 // Show lines/words count
  maxHeight?: string;                     // CSS max-height
  onCopy?: (code: string) => void;        // Copy callback
  onLineClick?: (lineNumber: number) => void;  // Line click callback
  onSearch?: (query: string, results: number[]) => void;  // Search callback
  initialSearchQuery?: string;           // Pre-filled search
  initialSearchResults?: number[];       // Pre-highlighted lines
  initialHighlightedLines?: number[];    // Initially highlighted lines
  // ... styling props
}
```

### Internal Architecture
```
CodeBlock Component
├── Header
│   ├── Language Icon (dynamic via icons.tsx)
│   ├── File Name Label (optional)
│   ├── Badges Display
│   ├── Meta Info (lines/words count)
│   └── Action Buttons
│       ├── Search Toggle
│       ├── Collapse/Expand
│       └── Copy Button
├── Search UI (conditional)
│   ├── Search Input
│   ├── Results Navigation (prev/next)
│   └── Close Button
└── Code Display
    ├── Line Numbers Overlay
    ├── SyntaxHighlighter (react-syntax-highlighter)
    └── Interactive Line Handling
```

### State Management
The component manages multiple state slices:
- **UI State:** `isCollapsed`, `isHovered`, `isSearching`
- **Copy State:** `isCopied` (with 2s timeout)
- **Search State:** `searchQuery`, `searchResults`, `currentResultIndex`
- **Highlighting:** `highlightedLines` (for both search results and manual selection)
- **Meta:** `stats` (calculated once from code)

### Key Internal Files
- **animations.ts:** Framer Motion variants for collapse, copy feedback, toast
- **custom-theme.ts:** Custom syntax highlighting theme (dark with specific color palette)
- **icons.tsx:** Language-specific icons (TypeScript, Python, Rust, SQL, etc.)
- **cn.ts:** Tailwind utility for conditional classes (`twMerge(clsx(...))`)

## Dependencies & Their Roles

### Core Framework
- **Next.js 15** - React framework with app directory
- **React 19 RC** - UI library (latest features)
- **TypeScript** - Type safety

### Syntax Highlighting & UI
- **react-syntax-highlighter** - Code syntax highlighting (uses PrismAsyncLight)
- **framer-motion** - Smooth animations and transitions
- **lucide-react** - Icon library for UI controls

### Styling & Design System
- **Tailwind CSS** - Utility-first CSS framework
- **@radix-ui/react-*** - Headless UI components (accordion, tabs, tooltip, etc.)
- **class-variance-authority** - Type-safe variant API for styling
- **clsx** + **tailwind-merge** - Conditional classes utility

## Distribution Strategy

This project uses a **"copy-the-component"** distribution model instead of npm packages:

### Manual Installation
1. Copy the entire `src/components/code-block/` directory to your project
2. Install required dependencies:
   ```bash
   npm install framer-motion lucide-react react-syntax-highlighter @radix-ui/react-slot class-variance-authority clsx tailwind-merge @radix-ui/react-tooltip
   ```
3. Import and use: `import { CodeBlock } from '@/components/code-block/code-block'`

### Quick Install Script
The README provides a one-liner git sparse-checkout script that:
- Clones only the component directory
- Copies it to your project
- Installs dependencies
- Cleans up temporary files

### Future Plans
- NPM package is planned but not yet available
- Current approach ensures "own your code" philosophy

## Critical Coding Conventions

⚠️ **These rules MUST be followed when modifying this codebase:**

### 1. Function Style
```typescript
// ✅ REQUIRED: Use function declarations
function MyComponent() { return <div />; }

// ❌ FORBIDDEN: Arrow function constants
const MyComponent = () => { return <div />; };
```

### 2. Export Style
```typescript
// ✅ REQUIRED: Named exports only
export function MyComponent() {}

// ❌ FORBIDDEN: Default exports (except Next.js pages/layouts)
export default MyComponent;
```

### 3. Type Definitions
```typescript
// ✅ REQUIRED: Use 'type', prefix with 'T'
type TProps = {
  title: string;
  onClick: () => void;
}

// ❌ FORBIDDEN: interfaces, unprefixed names
interface Props {}
type Props = {}
```

### 4. Single Type Per File Rule
If a file contains exactly **one non-exported type**, it **MUST** be named `TProps`:

```typescript
type TProps = {
  name: string;
  onClick?: () => void;
};

export function Button({ name, onClick }: TProps) {
  // Implementation
}
```

### 5. Comments Policy
- **Almost never write comments** - code should be self-explanatory
- **Exceptions:** JSDoc intros, complex business logic, difficult regex patterns
- **Never write redundant comments** like `// creating a task` above `createTask()`

### 6. Functional Style
- No classes, inheritance, or `new` keyword
- Prefer pure functions (same input → same output)
- Use composition over inheritance
- Favor immutability (spread operators, not mutation)

## Language & Icon Extension

To add support for new programming languages:

1. **Add language icon** in `src/components/code-block/icons.tsx`:
   ```typescript
   export function GoIcon({ className = "", size = DEFAULT_ICON_SIZE }: IconProps) {
     return <svg>...</svg>;
   }
   ```

2. **Update language icon mapping** in `code-block.tsx`:
   ```typescript
   function getLanguageIcon(language: string) {
     switch (language.toLowerCase()) {
       case "go":
         return <Icons.GoIcon size={16} />;
       // ... other cases
     }
   }
   ```

3. **Syntax highlighting** is handled automatically by `react-syntax-highlighter`

## Development Notes

### Performance Considerations
- Component uses `useCallback` for event handlers to prevent unnecessary re-renders
- Search is debounced through state updates
- Icons are loaded lazily through dynamic imports
- Framer Motion animations are optimized for 60fps

### Keyboard Shortcuts
The component registers global keyboard listeners for:
- **Cmd/Ctrl + C** - Copy code to clipboard
- **Cmd/Ctrl + F** - Open search mode
- **Enter/Shift+Enter** - Navigate search results
- **Escape** - Close search, clear highlights

### Theme Customization
The syntax highlighting theme is fully customizable through `custom-theme.ts`. It follows a dark theme with carefully chosen colors for readability.

### Testing Strategy
- Component is primarily tested through the live demo page
- Manual testing covers keyboard interactions, search functionality, and responsive behavior
- Visual regression testing through screenshot comparison

---

**Live Demo:** https://codeblock.remcostoeten.com/
**Repository:** https://github.com/remcostoeten/react-next-beautifull-code-block-syntax-highlight-search-kbd
**Author:** @remcostoeten
