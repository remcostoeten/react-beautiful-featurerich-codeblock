# Beautiful Code Block Component

A feature-rich, customizable code display component for React/Next.js applications with syntax highlighting, search functionality, keyboard shortcuts, and custom badges.

## ✨ Features

- 🎨 **Syntax highlighting** for 100+ languages via react-syntax-highlighter
- 🔍 **Interactive search** with Cmd/Ctrl+F and result navigation
- 📝 **Line highlighting** with click callbacks
- 📋 **Copy to clipboard** with Cmd/Ctrl+C
- 🎭 **Smooth animations** with Framer Motion
- 🏷️ **Custom badge system** with variants and CSS classes
- ⌨️ **Keyboard shortcuts** and accessibility support
- 🎯 **TypeScript** support with comprehensive type definitions

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install framer-motion lucide-react react-syntax-highlighter clsx tailwind-merge @radix-ui/react-slot class-variance-authority
```

### 2. Copy Component

Download `beautiful-code-block.tsx` and place it in your components directory.

### 3. Use Component

```tsx
import { CodeBlock } from './beautiful-code-block';

function MyComponent() {
  return (
    <CodeBlock
      code="const hello = 'world';"
      language="javascript"
      showLineNumbers
    />
  );
}
```

## 📝 Basic Usage

```tsx
<CodeBlock
  code={sourceCode}
  language="typescript"
  fileName="example.ts"
  badges={[
    { text: 'TypeScript', variant: 'primary' },
    { text: 'React', variant: 'secondary' }
  ]}
  showLineNumbers
  enableLineHighlight
/>
```

## 🎨 Custom Badges

Add custom badge styles to your CSS:

```css
/* Add to globals.css */
@layer components {
  .badge-neon {
    @apply bg-gradient-to-r from-cyan-400 to-blue-500 text-black border border-cyan-400/50;
  }
  
  .badge-fire {
    @apply bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white;
  }
}
```

Then use them:

```tsx
<CodeBlock
  code={code}
  language="javascript"
  badges={[
    { text: 'Neon', variant: 'custom', customClass: 'badge-neon' },
    { text: 'Fire', variant: 'custom', customClass: 'badge-fire' }
  ]}
/>
```

## ⌨️ Keyboard Shortcuts

- **Cmd/Ctrl + C**: Copy code to clipboard
- **Cmd/Ctrl + F**: Open search
- **Enter**: Next search result
- **Shift + Enter**: Previous search result
- **Escape**: Close search and clear highlights

## 🔧 Props API

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | **required** | Source code to display |
| `language` | `string` | **required** | Programming language for syntax highlighting |
| `fileName` | `string` | | Optional file name in header |
| `badges` | `TBadge[]` | `[]` | Array of badges to display |

### Display Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showLineNumbers` | `boolean` | `true` | Show line numbers |
| `enableLineHighlight` | `boolean` | `false` | Enable line highlighting on click |
| `showMetaInfo` | `boolean` | `true` | Show metadata (lines, words count) |
| `maxHeight` | `string` | `"400px"` | Maximum height before scrolling |

### Event Handlers

| Prop | Type | Description |
|------|------|-------------|
| `onCopy` | `(code: string) => void` | Called when code is copied |
| `onLineClick` | `(lineNumber: number) => void` | Called when a line is clicked |
| `onSearch` | `(query: string, results: number[]) => void` | Called when search is performed |

### Badge Configuration

```typescript
type TBadge = {
  text: string;
  variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'custom';
  customClass?: string; // For custom CSS classes
};
```

### Search & Highlighting

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialSearchQuery` | `string` | `""` | Pre-filled search query |
| `initialSearchResults` | `number[]` | `[]` | Initial search results |
| `initialHighlightedLines` | `number[]` | `[]` | Initially highlighted lines |

## 🎯 Advanced Example

```tsx
<CodeBlock
  code={complexCode}
  language="python"
  fileName="async-example.py"
  badges={[
    { text: 'Python', variant: 'warning' },
    { text: 'Async', variant: 'success' },
    { text: 'Custom', variant: 'custom', customClass: 'badge-neon' }
  ]}
  enableLineHighlight
  showLineNumbers
  maxHeight="500px"
  onCopy={(code) => console.log('Copied!')}
  onLineClick={(line) => console.log('Line clicked:', line)}
  onSearch={(query, results) => console.log('Search results:', results)}
  initialHighlightedLines={[1, 2, 3]}
/>
```

## 🚀 Performance

The component is optimized for performance with:

- **React.memo** for preventing unnecessary re-renders
- **useCallback** for stable event handlers
- **useMemo** for expensive calculations
- **Debounced search** (300ms) for smooth searching
- **Efficient animations** with Framer Motion

## 🎨 Supported Languages

All languages supported by `react-syntax-highlighter`, including:

- JavaScript/TypeScript
- Python, Rust, Go
- HTML, CSS, JSON
- SQL, Bash, YAML
- And 100+ more...

## 🔗 For 21st.dev

This component is perfect for 21st.dev as it's:

- ✅ **Single file** - Everything in one `beautiful-code-block.tsx`
- ✅ **Self-contained** - No relative imports, all utilities inlined
- ✅ **Well-typed** - Comprehensive TypeScript support
- ✅ **Production-ready** - Optimized performance and accessibility
- ✅ **Customizable** - Flexible badge system and styling options

## 🏗️ Built With

- **React 19** + **Next.js 15**
- **Framer Motion** for animations
- **Lucide React** for icons
- **react-syntax-highlighter** for code highlighting
- **Tailwind CSS** for styling
- **TypeScript** for type safety

---

**Author**: [@remcostoeten](https://github.com/remcostoeten)  
**Live Demo**: [codeblock.remcostoeten.com](https://codeblock.remcostoeten.com)  
**Repository**: [GitHub](https://github.com/remcostoeten/react-next-beautifull-code-block-syntax-highlight-search-kbd)
