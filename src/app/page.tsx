'use client'

import { Button } from '@/components/code-block/button'
import { CodeBlock } from '@/components/code-block/code-block'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/docs/accordion"
import { CodeBlockCreator } from '@/components/docs/block-creator'
import { Code, Github } from 'lucide-react'
import { useState, useEffect } from 'react'

const codeExamples = {
  javascript: `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));
  `,
  python: `
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

print(quick_sort([3, 6, 8, 10, 1, 2, 1]))
  `,
  rust: `
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    let doubled: Vec<i32> = numbers
        .iter()
        .map(|&x| x * 2)
        .collect();
    
    println!("Doubled numbers: {:?}", doubled);
}
  `,
  sql: `
SELECT 
    customers.name,
    COUNT(orders.id) as order_count,
    SUM(orders.total) as total_spent
FROM 
    customers
LEFT JOIN 
    orders ON customers.id = orders.customer_id
GROUP BY 
    customers.id
HAVING 
    COUNT(orders.id) > 5
ORDER BY 
    total_spent DESC
LIMIT 10;
  `
}

export default function DocsLandingPage() {
  const [activeLanguage, setActiveLanguage] = useState('javascript')
  const [searchDemoQuery, setSearchDemoQuery] = useState("n <= 1")
  const [searchDemoResults, setSearchDemoResults] = useState<number[]>([])

  const handleLineClick = (lineNumber: number) => {
    // You can implement any logic here if needed
    console.log(`Line ${lineNumber} clicked`);
  }

  useEffect(() => {
    // Find the line number containing "n <= 1"
    const lines = codeExamples.javascript.split('\n');
    const lineNumber = lines.findIndex(line => line.includes("n <= 1")) + 1;
    setSearchDemoResults(lineNumber > 0 ? [lineNumber] : []);
  }, [])

  const handleSearchDemo = (query: string, results: number[]) => {
    setSearchDemoQuery(query)
    setSearchDemoResults(results)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-[#333] py-6">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold">CodeBlock Documentation</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-4">A Beautiful Code Block Component for React</h2>
          <p className="text-xl text-gray-400 mb-6 max-w-2xl mx-auto">
            Enhance your React applications with a feature-rich, customizable code display component.
            Created by <a href="https://github.com/remcostoeten" className="text-white hover:underline">remcostoeten</a>.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <a href="https://github.com/remcostoeten/beautifull-code-block" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://www.npmjs.com/package/beautifull-code-block" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Code className="mr-2 h-5 w-5" />
                View on npm
              </a>
            </Button>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-6">Installation</h3>
          <p className="mb-4 text-gray-400">
            You can install the CodeBlock component using the following bash script:
          </p>
          <CodeBlock
            code={`#!/bin/bash

echo "🚀 Installing beautiful-code-block component..."

# Clone repository sparsely (only what we need)
git clone --depth 1 --filter=blob:none --sparse https://github.com/remcostoeten/beautifull-code-block

# Enter directory
cd beautifull-code-block

# Set sparse-checkout to only get the code-block component
git sparse-checkout set src/components/code-block

# Copy to components folder (creates it if it doesn't exist)
mkdir -p ../components
cp -r src/components/code-block ../components/

# Clean up: remove cloned repo
cd ..
rm -rf beautifull-code-block

# Install all required dependencies
echo "📦 Installing dependencies..."

npm install \\
  framer-motion \\
  lucide-react \\
  react-syntax-highlighter \\
  @radix-ui/react-slot \\
  class-variance-authority \\
  clsx \\
  tailwind-merge \\
  @radix-ui/react-dropdown-menu \\
  @radix-ui/react-toast

echo "
✅ Installation complete! 

📁 Component files installed in: ./components/code-block
📦 Dependencies installed:
   • framer-motion
   • lucide-react
   • react-syntax-highlighter
   • @radix-ui/react-slot
   • class-variance-authority
   • clsx
   • tailwind-merge
   • @radix-ui/react-dropdown-menu
   • @radix-ui/react-toast

🔍 Make sure you have these peer dependencies in your project:
   • react
   • react-dom
   • tailwindcss

🎨 Component is ready to use!"
`}
            language="bash"
            showLineNumbers
          />
          <p className="mt-4 text-gray-400">
            Alternatively, you can use this one-liner command in your terminal:
          </p>
          <CodeBlock
            code={`git clone --depth 1 --filter=blob:none --sparse https://github.com/remcostoeten/beautifull-code-block && cd beautifull-code-block && git sparse-checkout set src/components/code-block && mkdir -p ../components && cp -r src/components/code-block ../components/ && cd .. && rm -rf beautifull-code-block && npm install framer-motion lucide-react react-syntax-highlighter @radix-ui/react-slot class-variance-authority clsx tailwind-merge @radix-ui/react-dropdown-menu @radix-ui/react-toast && echo "✅ Code block component installed!"`}
            language="bash"
            showLineNumbers
          />
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-6">Language Showcase</h3>
          <div className="mb-4 flex space-x-2">
            {Object.keys(codeExamples).map((lang) => (
              <Button
                key={lang}
                variant={activeLanguage === lang ? "default" : "outline"}
                onClick={() => setActiveLanguage(lang)}
              >
                {lang}
              </Button>
            ))}
          </div>
          <CodeBlock
            code={codeExamples[activeLanguage]}
            language={activeLanguage}
            showLineNumbers
            enableLineHighlight
          />
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-6">Feature Showcase</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="line-numbers">
              <AccordionTrigger>Line Numbers</AccordionTrigger>
              <AccordionContent>
                <CodeBlock
                  code={codeExamples.javascript}
                  language="javascript"
                  showLineNumbers={true}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="line-highlight">
              <AccordionTrigger>Line Highlight</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4 text-sm text-gray-400">Click on a line to highlight it. Click again to remove the highlight.</p>
                <CodeBlock
                  code={codeExamples.javascript}
                  language="javascript"
                  showLineNumbers={true}
                  enableLineHighlight={true}
                  onLineClick={handleLineClick}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="search">
              <AccordionTrigger>Search Functionality</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4 text-sm text-gray-400">
                  This demo shows the search functionality in action. The search box is pre-filled with &quot;n &lt;= 1&quot; and the matching line is highlighted.
                </p>
                <CodeBlock
                  code={codeExamples.javascript}
                  language="javascript"
                  showLineNumbers
                  enableLineHighlight
                  onSearch={handleSearchDemo}
                  initialSearchQuery={searchDemoQuery}
                  initialSearchResults={searchDemoResults}
                />
                <div className="mt-4 text-sm text-gray-400">
                  Search query: <span className="text-white">{searchDemoQuery}</span>
                  <br />
                  Matching lines: <span className="text-white">{searchDemoResults.join(', ')}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="file-name">
              <AccordionTrigger>File Name Display</AccordionTrigger>
              <AccordionContent>
                <CodeBlock
                  code={codeExamples.javascript}
                  language="javascript"
                  fileName="example.js"
                  showLineNumbers
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="badges">
              <AccordionTrigger>Badges</AccordionTrigger>
              <AccordionContent>
                <CodeBlock
                  code={codeExamples.javascript}
                  language="javascript"
                  badges={['Example', 'JavaScript']}
                  showLineNumbers
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-6">Create Your Own</h3>
          <CodeBlockCreator />
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-6">API Reference</h3>
          <p className="mb-4 text-gray-400">
            The CodeBlock component accepts the following props to customize its appearance and behavior:
          </p>
          <CodeBlock
            code={`
type CodeBlockProps = {
  code: string;                // The code to be displayed
  language: string;            // The programming language for syntax highlighting
  fileName?: string;           // Optional file name to display
  badges?: string[];           // Optional array of badge strings to display
  showLineNumbers?: boolean;   // Whether to show line numbers (default: true)
  enableLineHighlight?: boolean; // Allow clicking to highlight lines (default: false)
  showMetaInfo?: boolean;      // Show metadata like line count (default: true)
  maxHeight?: string;          // Maximum height of the code block (default: '400px')
  onCopy?: (code: string) => void; // Callback when code is copied
  onLineClick?: (lineNumber: number) => void; // Callback when a line is clicked
  onSearch?: (query: string, results: number[]) => void; // Callback for search
  badgeVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'custom';
  badgeColor?: string;         // Custom color for badges when badgeVariant is 'custom'
  fileNameColor?: string;      // Custom color for the file name
  initialSearchQuery?: string; // Initial search query
  initialSearchResults?: number[]; // Initial search results (line numbers)
}

// Example usage:
<CodeBlock
  code="console.log('Hello, world!');"
  language="javascript"
  fileName="example.js"
  badges={['Example', 'JavaScript']}
  showLineNumbers={true}
  enableLineHighlight={true}
  onCopy={(code) => console.log('Copied:', code)}
  onLineClick={(lineNumber) => console.log('Clicked line:', lineNumber)}
  onSearch={(query, results) => console.log('Search:', query, 'Results:', results)}
  badgeVariant="primary"
/>
            `}
            language="typescript"
            fileName="CodeBlock.tsx"
            showLineNumbers
          />
          <div className="mt-6 space-y-4">
            <h4 className="text-xl font-semibold">Key Features Explained:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li><strong>Syntax Highlighting:</strong> Automatically detects and highlights syntax based on the specified language.</li>
              <li><strong>Line Numbers:</strong> Optionally display line numbers for easy reference.</li>
              <li><strong>Line Highlighting:</strong> Enable interactive line highlighting by clicking on individual lines.</li>
              <li><strong>File Name Display:</strong> Show a file name at the top of the code block for context.</li>
              <li><strong>Badges:</strong> Add custom badges to categorize or tag your code snippets.</li>
              <li><strong>Search Functionality:</strong> Built-in search with highlighting of matching lines.</li>
              <li><strong>Copy to Clipboard:</strong> One-click copy functionality with visual feedback.</li>
              <li><strong>Customizable Appearance:</strong> Adjust colors, max height, and other visual aspects to fit your design.</li>
            </ul>
          </div>
          <div className="mt-6">
            <h4 className="text-xl font-semibold mb-2">Implementation Example:</h4>
            <CodeBlock
              code={`
import { CodeBlock } from '@/components/code-block/code-block';

function MyComponent() {
  const handleCopy = (code: string) => {
    console.log('Code copied:', code);
  };

  const handleLineClick = (lineNumber: number) => {
    console.log('Line clicked:', lineNumber);
  };

  return (
    <CodeBlock
      code="function greet(name) {\n  console.log(\`Hello, \${name}!\`);\n}\n\ngreet('World');"
      language="javascript"
      fileName="greeting.js"
      badges={['Function', 'Example']}
      showLineNumbers={true}
      enableLineHighlight={true}
      onCopy={handleCopy}
      onLineClick={handleLineClick}
      badgeVariant="primary"
    />
  );
}
              `}
              language="typescript"
              fileName="MyComponent.tsx"
              showLineNumbers
              enableLineHighlight
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-[#333] py-6 text-center text-gray-400">
        <div className="max-w-6xl mx-auto px-6">
          <p>Created by <a href="https://github.com/remcostoeten" className="text-white hover:underline">Remco Stoeten</a>. Licensed under MIT.</p>
        </div>
      </footer>
    </div>
  )
}
