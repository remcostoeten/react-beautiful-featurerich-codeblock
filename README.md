# CodeBlock

CodeBlock is a presenter component which I initially created for storing snippets inside any JSX renderer. I eventually decided to expand it by generalizing the non-project specific details and making it more feature-rich. Besides being the most beautiful code-block component you'll find on the internet, it is fairly minimal with an easy-to-use API while still containing enough features to be a go-to solution.

[Live Demo](https://codeblock.remcostoeten.com/)

![chrome-capture-2024-10-27](https://github.com/user-attachments/assets/6d4c698b-484f-4d62-822a-a4307b87e137)

## Features

- Unified syntax highlighting with language indicator support (Rust, TypeScript, React, Markdown, Python, JavaScript, with easy addition of new ones through `icons.tsx`)
- Beautiful theme with optional customizable file
- Line numbers and *line highlighting*
- Keyboard shortcuts:
  - CMD/CTRL + C to copy selection
  - CMD/CTRL + F to search
  - CMD/CTRL + G to jump to line
- Search and highlight found lines
- Easy integration with React applications
- Custom colorized labels and badges
- Paste button
- Copy button
- Package-less in-block toast alerts (copied to clipboard etc.)

## Examples

### Basic Usage
```tsx
import { CodeBlock } from '@/components/code-block/code-block'

// Basic example
<CodeBlock
  language="typescript"
  label="Example Component"
  value={codeString}
/>
```

### Advanced Usage with Event Handlers
```tsx
import { CodeBlock } from '@/components/code-block/code-block'

export default function AdvancedExample() {
  const handleSearch = (query: string, results: number[]) => {
    console.log(`Found matches at lines: ${results.join(', ')}`)
  }

  const handleLineClick = (lineNumber: number) => {
    console.log(`Line ${lineNumber} clicked`)
  }

  return (
    <CodeBlock
      code={codeString}
      language="python"
      showLineNumbers
      enableLineHighlight
      fileName="example.py"
      badges={[
        { text: 'Python', variant: 'primary' },
        { text: 'Example', variant: 'secondary' }
      ]}
      onSearch={handleSearch}
      onLineClick={handleLineClick}
      initialHighlightedLines={[1, 2, 3]}
      maxHeight="500px"
    />
  )
}
```

## TypeScript Props

```typescript
type CodeBlockProps = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  enableLineHighlight?: boolean;
  fileName?: string;
  badges?: Array<{
    text: string;
    variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  }>;
  onSearch?: (query: string, results: number[]) => void;
  initialSearchQuery?: string;
  initialSearchResults?: number[];
  onLineClick?: (lineNumber: number) => void;
  initialHighlightedLines?: number[];
  maxHeight?: string;
}
```

### Props Description

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | Required | The source code to be displayed in the code block |
| `language` | `string` | `'typescript'` | Programming language for syntax highlighting (e.g., 'python', 'javascript', 'rust') |
| `showLineNumbers` | `boolean` | `false` | Enable/disable line number display in the gutter |
| `enableLineHighlight` | `boolean` | `false` | Enable/disable the ability to highlight lines on hover/click |
| `fileName` | `string` | - | Optional filename to display above the code block |
| `badges` | `Array<Badge>` | - | Array of badge objects to display. Each badge has text and variant properties |
| `onSearch` | `function` | - | Callback function triggered on search, receives query string and array of matching line numbers |
| `initialSearchQuery` | `string` | - | Pre-populate the search field with this query |
| `initialSearchResults` | `number[]` | - | Pre-highlight these line numbers as search results |
| `onLineClick` | `function` | - | Callback function triggered when a line is clicked, receives line number |
| `initialHighlightedLines` | `number[]` | - | Array of line numbers to highlight on initial render |
| `maxHeight` | `string` | - | CSS max-height value for the code block container |

### Badge Variants

Badges can be customized with the following variants:
- `default`: Standard badge style
- `primary`: Primary theme color
- `secondary`: Secondary theme color
- `success`: Green success indicator
- `warning`: Yellow warning indicator
- `danger`: Red danger/error indicator

### Complete Example

```tsx
import { CodeBlock } from '@/components/code-block/code-block'

export default function CompleteExample() {
  return (
    <CodeBlock
      code={`function example() {
  console.log("Hello, World!");
}`}
      language="typescript"
      showLineNumbers={true}
      enableLineHighlight={true}
      fileName="example.ts"
      badges={[
        { text: 'TypeScript', variant: 'primary' },
        { text: 'Example', variant: 'secondary' },
        { text: 'Beta', variant: 'warning' }
      ]}
      onSearch={(query, results) => {
        console.log(`Found ${results.length} matches for "${query}"`)
      }}
      initialSearchQuery="console"
      initialSearchResults={[2]}
      onLineClick={(lineNumber) => {
        console.log(`Clicked line ${lineNumber}`)
      }}
      initialHighlightedLines={[1, 2, 3]}
      maxHeight="400px"
    />
  )
}
```

## Installation & Usage

No package needed - own your code by copying the required files into your project. An NPM package is on the roadmap for personal use, but currently the setup requires manually copying the [code-block](https://github.com/remcostoeten/react-next-beautifull-code-block-syntax-highlight-search-kbd/tree/main/src/components/code-block) into your project.

### Quick Install

You can use the *highly experimental* one-liner install command:

```bash
echo "🚀 Installing beautiful-code-block component..." && git clone --depth 1 --filter=blob:none --sparse https://github.com/remcostoeten/react-next-beautifull-code-block-syntax-highlight-search-kbd && cd react-next-beautifull-code-block-syntax-highlight-search-kbd && git sparse-checkout set src/components/code-block && mkdir -p ../components && cp -r src/components/code-block ../components/ && cd .. && rm -rf react-next-beautifull-code-block-syntax-highlight-search-kbd && echo "📦 Installing dependencies..." && npm install framer-motion lucide-react react-syntax-highlighter @radix-ui/react-slot class-variance-authority clsx tailwind-merge @radix-ui/react-dropdown-menu @radix-ui/react-toast && echo "✓ Installation complete!""
```

### Installation Script

For better control, create an installation script in your project root:

1. Create the script file:
```bash
touch setup.sh
sudo chmod +x setup.sh

# Edit with your preferred editor
vim setup.sh
```

2. Add the following content:
```bash
#!/bin/bash
# Display start message
echo "🚀 Installing beautiful-code-block component..." &&
  # Clone repository with sparse checkout
  git clone --depth 1 --filter=blob:none --sparse 
    https://github.com/remcostoeten/react-next-beautifull-code-block-syntax-highlight-search-kbd &&
  # Navigate into repository
  cd react-next-beautifull-code-block-syntax-highlight-search-kbd &&
  # Set sparse-checkout for code-block component
  git sparse-checkout set src/components/code-block &&
  # Create components directory if not exists
  mkdir -p ../components &&
  # Copy code-block component to components directory
  cp -r src/components/code-block ../components/ &&
  # Navigate back and cleanup cloned repository
  cd .. &&
  rm -rf react-next-beautifull-code-block-syntax-highlight-search-kbd &&
  # Install dependencies
  echo "📦 Installing dependencies..." &&
  npm install 
    framer-motion 
    lucide-react 
    react-syntax-highlighter 
    @radix-ui/react-slot 
    class-variance-authority 
    clsx 
    tailwind-merge 
    @radix-ui/react-dropdown-menu 
    @radix-ui/react-toast &&
  # Display completion message
  echo "✓ Installation complete!"
```

## Demo & Documentation

For live examples and complete documentation, visit [https://codeblock.remcostoeten.com](https://codeblock.remcostoeten.com)
