"use client";

import { Button } from "@/components/code-block/button";
import { CodeBlock } from "@/components/code-block/code-block";
import { Github, Download, ExternalLink, Zap, FileText, Layers } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Import the single-file component from root
import { CodeBlock as SingleFileCodeBlock } from "../../../beautiful-code-block";

// Example code for showcasing
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const singleFileComponentCode = `/**
 * Beautiful Code Block Component
 * 
 * A feature-rich, customizable code display component for React/Next.js applications
 * with syntax highlighting, search functionality, keyboard shortcuts, and custom badges.
 * 
 * Features:
 * • Syntax highlighting for 100+ languages
 * • Interactive search with Cmd/Ctrl+F
 * • Line highlighting and click callbacks
 * • Copy to clipboard with Cmd/Ctrl+C
 * • Collapsible code blocks with smooth animations
 * • Custom badge system with variants
 * • Keyboard shortcuts and accessibility support
 * 
 * Installation:
 * 1. Install dependencies: framer-motion lucide-react react-syntax-highlighter clsx tailwind-merge @radix-ui/react-slot class-variance-authority
 * 2. Copy this file to your components directory
 * 3. Import and use: import { CodeBlock } from './beautiful-code-block'
 * 
 * @author Remco Stoeten (@remcostoeten)
 */

"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Code as DefaultIcon,
  File,
  Search,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
// ... rest of the component code`;

const installationCode = `# 1. Install dependencies
npm install framer-motion lucide-react react-syntax-highlighter clsx tailwind-merge @radix-ui/react-slot class-variance-authority

# 2. Copy the component file
# Download beautiful-code-block.tsx and place it in your components directory

# 3. Use in your project
import { CodeBlock } from './beautiful-code-block';

function MyComponent() {
  return (
    <CodeBlock
      code="const hello = 'world';"
      language="javascript"
      showLineNumbers
    />
  );
}`;

const customBadgeExample = `// In your CSS or Tailwind config
.badge-custom {
  @apply bg-gradient-to-r from-pink-500 to-purple-500 text-white border border-pink-500/30;
}

.badge-neon {
  @apply bg-gradient-to-r from-cyan-400 to-blue-500 text-black border border-cyan-400/50 shadow-lg shadow-cyan-400/25;
}

.badge-fire {
  @apply bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white border border-orange-500/40;
}

// In your component
<CodeBlock
  code={myCode}
  badges={[
    { text: 'Custom', variant: 'custom' },
    { text: 'Neon', variant: 'custom', customClass: 'badge-neon' },
    { text: 'Fire', variant: 'custom', customClass: 'badge-fire' }
  ]}
/>`;

const advancedUsageCode = `<CodeBlock
  code={sourceCode}
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
/>`;

const demoCode = `async function fetchUserData(userId: number): Promise<User | null> {
  try {
    const response = await fetch(\`/api/users/\${userId}\`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

// Usage example
const user = await fetchUserData(123);
if (user) {
  console.log('User loaded:', user.name);
} else {
  console.log('Failed to load user');
}`;

const features = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Single File",
    description: "Everything in one file - no relative imports, completely self-contained"
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Performance Optimized",
    description: "React.memo, useCallback, useMemo, and debounced search for smooth UX"
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Feature Complete",
    description: "All original functionality preserved with custom badges and advanced features"
  }
];

export function SingleFileView() {
  const [activeTab, setActiveTab] = useState<'demo' | 'installation' | 'custom-badges' | 'advanced'>('demo');

  function handleDownload() {
    // Create a download link for the component file
    const component = document.createElement('a');
    component.href = '/beautiful-code-block.tsx';
    component.download = 'beautiful-code-block.tsx';
    component.click();
  }

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div className="relative">
        <main className="max-w-6xl mx-auto px-6 py-16 space-y-20">
          
          {/* Hero Section */}
          <section className="text-center">
            <div className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 mb-8">
              <span className="text-blue-400 font-semibold">
                Single File Component
              </span>
              <span className="text-xs text-green-400">
                Production Ready
              </span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Beautiful Code Block
              <br />
              <span className="text-3xl text-gray-400">Single File Version</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              The complete Beautiful Code Block component consolidated into a single file. 
              Perfect for component libraries and easy integration - all functionality, zero dependencies, 
              maximum portability.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Component
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-gray-700 hover:bg-gray-800"
              >
                <a
                  href="https://github.com/remcostoeten/react-next-beautifull-code-block-syntax-highlight-search-kbd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Source
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
              >
                <a
                  href="https://codeblock.remcostoeten.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg mb-4 text-blue-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Live Demo Section */}
          <section>
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Live Demo - Single File Component
            </h2>
            
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { key: 'demo', label: 'Interactive Demo' },
                { key: 'installation', label: 'Installation' },
                { key: 'custom-badges', label: 'Custom Badges' },
                { key: 'advanced', label: 'Advanced Usage' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as 'demo' | 'installation' | 'custom-badges' | 'advanced')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'demo' && (
              <div className="space-y-8">
                <div className="text-center mb-6">
                  <p className="text-gray-400 mb-4">
                    This demo uses the single-file component. Try the search (Cmd/Ctrl+F), 
                    copy (Cmd/Ctrl+C), and line highlighting features!
                  </p>
                </div>
                
                <SingleFileCodeBlock
                  code={demoCode}
                  language="typescript"
                  fileName="user-service.ts"
                  badges={[
                    { text: "Single File", variant: "custom" },
                    { text: "TypeScript", variant: "primary" },
                    { text: "Async", variant: "success" },
                    { text: "Production Ready", variant: "secondary" }
                  ]}
                  enableLineHighlight
                  showLineNumbers
                  onCopy={() => console.log('Copied from single-file component!')}
                  onLineClick={(line) => console.log('Line clicked:', line)}
                  onSearch={(query, results) => console.log('Search:', query, 'Results:', results)}
                  initialHighlightedLines={[1, 8]}
                />
              </div>
            )}

            {activeTab === 'installation' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Quick Installation</h3>
                <SingleFileCodeBlock
                  code={installationCode}
                  language="bash"
                  fileName="install.sh"
                  badges={[
                    { text: "Installation", variant: "success" },
                    { text: "3 Steps", variant: "primary" }
                  ]}
                  showLineNumbers
                />
                
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-3 text-green-400">Why Single File?</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong>Zero Configuration:</strong> No build setup or relative imports</li>
                    <li>• <strong>Maximum Portability:</strong> Works in any React project instantly</li>
                    <li>• <strong>Component Library Ready:</strong> Perfect for shadcn/ui style libraries and component collections</li>
                    <li>• <strong>Self-Contained:</strong> All utilities, types, and logic in one file</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'custom-badges' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Custom Badge System</h3>
                <SingleFileCodeBlock
                  code={customBadgeExample}
                  language="tsx"
                  fileName="custom-badges-example.tsx"
                  badges={[
                    { text: "CSS", variant: "secondary" },
                    { text: "Tailwind", variant: "primary" },
                    { text: "Custom", variant: "custom" }
                  ]}
                  showLineNumbers
                />
                
                {/* Live Example */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Live Custom Badges Example</h4>
                  <SingleFileCodeBlock
                    code="// This code block demonstrates all custom badge variants"
                    language="javascript"
                    badges={[
                      { text: "Custom", variant: "custom" },
                      { text: "Neon", variant: "custom", customClass: "bg-gradient-to-r from-cyan-400 to-blue-500 text-black border border-cyan-400/50" },
                      { text: "Fire", variant: "custom", customClass: "bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white border border-orange-500/40" },
                      { text: "Ocean", variant: "custom", customClass: "bg-gradient-to-r from-blue-600 via-blue-500 to-teal-400 text-white border border-blue-500/40" }
                    ]}
                    showLineNumbers={false}
                  />
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Advanced Features</h3>
                <SingleFileCodeBlock
                  code={advancedUsageCode}
                  language="tsx"
                  fileName="advanced-usage.tsx"
                  badges={[
                    { text: "Advanced", variant: "warning" },
                    { text: "Full Featured", variant: "success" }
                  ]}
                  showLineNumbers
                />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-3 text-blue-400">Interactive Features</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Search with Cmd/Ctrl+F</li>
                      <li>• Copy with Cmd/Ctrl+C</li>
                      <li>• Line highlighting on click</li>
                      <li>• Smooth collapse animations</li>
                      <li>• Keyboard navigation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">Performance</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• React.memo optimization</li>
                      <li>• Debounced search (300ms)</li>
                      <li>• Memoized calculations</li>
                      <li>• Efficient re-renders</li>
                      <li>• Smooth 60fps animations</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Comparison Section */}
          <section>
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Multi-File vs Single-File Comparison
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-300">Original Multi-File</h3>
                <CodeBlock
                  code={`src/components/code-block/
├── code-block.tsx      # Main component
├── animations.ts       # Framer Motion variants
├── custom-theme.ts     # Syntax highlighting theme
├── icons.tsx           # Language icons
├── button.tsx          # Button component
├── cn.ts              # Utility functions
└── ...                # Other utilities

// Usage requires multiple files
import { CodeBlock } from '@/components/code-block/code-block'`}
                  language="plaintext"
                  fileName="multi-file-structure"
                  badges={[
                    { text: "7+ Files", variant: "warning" },
                    { text: "Complex", variant: "danger" }
                  ]}
                  showLineNumbers={false}
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-400">Single-File Version</h3>
                <SingleFileCodeBlock
                  code={`components/
└── beautiful-code-block.tsx   # Everything in one file!

// Simple usage - just one import
import { CodeBlock } from './beautiful-code-block'

// Same features, same API, same performance
// Perfect for component libraries!`}
                  language="plaintext"
                  fileName="single-file-structure"
                  badges={[
                    { text: "1 File", variant: "success" },
                    { text: "Simple", variant: "primary" },
                    { text: "Portable", variant: "custom" }
                  ]}
                  showLineNumbers={false}
                />
              </div>
            </div>
          </section>

          {/* Component Stats */}
          <section className="text-center">
            <h2 className="text-3xl font-semibold mb-8">Component Statistics</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Lines of Code", value: "720", color: "text-blue-400" },
                { label: "File Size", value: "~24KB", color: "text-green-400" },
                { label: "Dependencies", value: "7", color: "text-yellow-400" },
                { label: "Languages", value: "100+", color: "text-purple-400" }
              ].map((stat, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                  <div className={`text-2xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center bg-gray-800/30 border border-gray-700 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Use?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Download the single-file component and start using it in your project today. 
              Perfect for personal projects, component libraries, or any React application.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Component
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-gray-700 hover:bg-gray-800"
              >
                <Link href="/" className="flex items-center">
                  View Full Demo
                </Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
