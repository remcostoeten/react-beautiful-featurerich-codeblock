"use client";

import PropsTable from "@/v1-multi-file/api-renderer";
import { Button } from "@/v1-multi-file/code-block/button";
import { CodeBlock } from "@/v1-multi-file/code-block/code-block";
import { CodeBlockCreator } from "@/v1-multi-file/docs/block-creator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/v1-multi-file/docs/tabs";
import { Github, FileText } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// Code examples with different languages
const codeExamples = {
  javascript: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

// Usage of the async function
(async () => {
  const userId = 123;
  const user = await fetchUserData(userId);
  if (user) {
    console.log('User data:', user);
  } else {
    console.log('Failed to fetch user data');
  }
})();`,

  python: `import asyncio
import aiohttp

async def fetch_pokemon_data(pokemon_name):
    async with aiohttp.ClientSession() as session:
        async with session.get(f'https://pokeapi.co/api/v2/pokemon/{pokemon_name}') as response:
            if response.status == 200:
                data = await response.json()
                return {
                    'name': data['name'],
                    'height': data['height'],
                    'weight': data['weight'],
                    'types': [t['type']['name'] for t in data['types']]
                }
            else:
                return None

async def main():
    pokemon_names = ['pikachu', 'charizard', 'bulbasaur']
    tasks = [fetch_pokemon_data(name) for name in pokemon_names]
    results = await asyncio.gather(*tasks)
    
    for pokemon in results:
        if pokemon:
            print(f"Name: {pokemon['name']}")
            print(f"Height: {pokemon['height']}")
            print(f"Weight: {pokemon['weight']}")
            print(f"Types: {', '.join(pokemon['types'])}")
            print()
        else:
            print(f"Failed to fetch data for {pokemon}")

asyncio.run(main())`,

  rust: `use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use std::thread;

fn word_frequency(text: &str) -> HashMap<String, usize> {
    let word_counts = Arc::new(Mutex::new(HashMap::new()));
    let words: Vec<&str> = text.split_whitespace().collect();

    let threads: Vec<_> = words
        .chunks(words.len() / 4)
        .map(|chunk| {
            let word_counts = Arc::clone(&word_counts);
            let chunk = chunk.to_vec();
            thread::spawn(move || {
                for word in chunk {
                    let mut counts = word_counts.lock().unwrap();
                    *counts.entry(word.to_lowercase()).or_insert(0) += 1;
                }
            })
        })
        .collect();

    for thread in threads {
        thread.join().unwrap();
    }

    Arc::try_unwrap(word_counts).unwrap().into_inner().unwrap()
}

fn main() {
    let text = "The quick brown fox jumps over the lazy dog. The dog barks, and the fox runs away.";
    let frequency = word_frequency(text);
    
    for (word, count) in frequency.iter() {
        println!("{}: {}", word, count);
    }
}`,

  sql: `WITH RECURSIVE subordinates AS (
  SELECT employee_id, manager_id, first_name, last_name, 0 AS level
  FROM employees
  WHERE employee_id = 1  -- Start with the CEO

  UNION ALL

  SELECT e.employee_id, e.manager_id, e.first_name, e.last_name, s.level + 1
  FROM employees e
  INNER JOIN subordinates s ON s.employee_id = e.manager_id
)
SELECT 
    CONCAT(REPEAT('  ', level), first_name, ' ', last_name) AS employee_hierarchy,
    level
FROM subordinates
ORDER BY level, first_name, last_name;`,
};

// Installation script
const installationScript = `#!/bin/bash

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

echo "✅ Installation complete!"
`;

function InstallationSection() {
  return (
    <section id="installation" className="text-left">
      <h3 className="text-2xl font-semibold mb-6 text-neutral-200">
        Installation
      </h3>
      <p className="mb-4 text-gray-400">
        You can install the CodeBlock component using the following bash script:
      </p>
      <CodeBlock code={installationScript} language="bash" showLineNumbers />
      <div className="mt-6 p-4 bg-black rounded-md text-gray-300 border border-gray-800">
        <p className="font-semibold mb-2">After running the script:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            A new folder called{" "}
            <code className="bg-gray-800 px-1 py-0.5 rounded">code-block</code>{" "}
            will be created in your components directory.
          </li>
          <li>The CodeBlock component is now ready to use in your project.</li>
          <li>
            Import it in your files like this:{" "}
            <code className="bg-gray-800 px-1 py-0.5 rounded">
              import CodeBlock from '@/components/code-block/code-block'
            </code>
          </li>
        </ul>
      </div>
    </section>
  );
}

function ApiReferenceSection() {
  const sections = [
    {
      title: "Core Props",
      description: "Essential properties for the code block",
      expandedByDefault: true,
      props: [
        {
          name: "code",
          type: "string",
          description: "The source code to be displayed",
          required: true,
          example: 'const greeting = "Hello, world!";',
        },
        {
          name: "language",
          type: "string",
          description: "Programming language for syntax highlighting",
          defaultValue: "plaintext",
          values: [
            { value: "javascript", description: "JavaScript/ECMAScript" },
            { value: "typescript", description: "TypeScript" },
            { value: "python", description: "Python" },
            // Add more supported languages
          ],
          link: "https://prismjs.com/#supported-languages",
        },
      ],
    },
    {
      title: "Display Options",
      description: "Visual customization properties",
      props: [
        {
          name: "showLineNumbers",
          type: "boolean",
          defaultValue: "true",
          description: "Show line numbers in the gutter",
          since: "1.0.0",
        },
        {
          name: "enableLineHighlight",
          type: "boolean",
          defaultValue: "false",
          description: "Enable line highlighting functionality",
          notes: ["Requires showLineNumbers to be true for best experience"],
        },
        {
          name: "showMetaInfo",
          type: "boolean",
          defaultValue: "true",
          description: "Show file metadata in header (lines, words)",
        },
        {
          name: "maxHeight",
          type: "string",
          defaultValue: "400px",
          description: "Maximum height before scrolling",
          example: "500px",
        },
        {
          name: "fileName",
          type: "string",
          description: "Name of the file to display in header",
          example: "example.ts",
        },
      ],
    },
    {
      title: "Styling",
      description: "Visual and theme customization",
      props: [
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes to apply",
        },
        {
          name: "badgeVariant",
          type: '"default" | "primary" | "secondary" | "success" | "warning" | "danger" | "custom"',
          defaultValue: "default",
          description: "Style variant for badges",
        },
        {
          name: "badgeColor",
          type: "string",
          description: 'Custom color for badges when variant is "custom"',
          example: "blue-500",
        },
        {
          name: "fileNameColor",
          type: "string",
          description: "Custom color for the file name label",
          example: "blue-500",
        },
      ],
    },
    {
      title: "Interactive Features",
      description: "Event handlers and interactive functionality",
      props: [
        {
          name: "onCopy",
          type: "(code: string) => void",
          description: "Called when code is copied to clipboard",
          example: "(code) => console.log(`Copied: ${code}`)",
        },
        {
          name: "onLineClick",
          type: "(lineNumber: number) => void",
          description: "Called when a line is clicked",
          example: "(line) => console.log(`Clicked line ${line}`)",
        },
        {
          name: "onSearch",
          type: "(query: string, results: number[]) => void",
          description: "Called when search is performed",
          example:
            "(query, results) => console.log(`Found ${results.length} matches`)",
        },
      ],
    },
    {
      title: "Search & Highlighting",
      description: "Search and line highlighting features",
      props: [
        {
          name: "initialSearchQuery",
          type: "string",
          description: "Initial search term",
          defaultValue: '""',
        },
        {
          name: "initialSearchResults",
          type: "number[]",
          description: "Initial array of line numbers matching search",
          defaultValue: "[]",
        },
        {
          name: "initialHighlightedLines",
          type: "number[]",
          description: "Line numbers to highlight on initial render",
          defaultValue: "[]",
          example: "[1, 2, 3]",
        },
      ],
    },
    {
      title: "Badge Configuration",
      description: "Configuration for code block badges",
      props: [
        {
          name: "badges",
          type: "Array<{ text: string; variant: BadgeVariant }>",
          description: "Array of badges to display",
          example: `[
  { text: "TypeScript", variant: "primary" },
  { text: "React", variant: "secondary" }
]`,
        },
      ],
    },
    {
      title: "Layout Options",
      description: "Control the layout and spacing of the component",
      props: [
        {
          name: "propSpacing",
          type: '"none" | "tight" | "normal" | "relaxed"',
          defaultValue: "normal",
          description: "Controls the vertical spacing between props",
          example: 'propSpacing="relaxed"',
          values: [
            { value: "none", description: "No spacing between props" },
            { value: "tight", description: "Minimal spacing, compact layout" },
            { value: "normal", description: "Standard spacing" },
            {
              value: "relaxed",
              description: "Extra spacing for better readability",
            },
          ],
        },
      ],
    },
  ];

  return (
    <section id="api-reference" className="text-left">
      <h3 className="text-2xl font-semibold mb-6 text-neutral-200">
        API Reference
      </h3>
      <p className="mb-4 text-gray-400">
        The CodeBlock component accepts the following props to customize its
        appearance and behavior:
      </p>
      <PropsTable
        sections={sections}
        showTypeColumn
        showDefaultColumn
        initialTheme="dark"
        initialSpacing="normal"
        initialPropSpacing="normal"
        searchable
        collapsible
        showCopyButton
        showVersionBadges
        showBetaBadges
        className="w-full transform-gpu"
      />
    </section>
  );
}

export function HomeView() {
  const [searchDemoQuery, setSearchDemoQuery] = useState("return userData");
  const [searchDemoResults, setSearchDemoResults] = useState<number[]>([]);

  useEffect(() => {
    try {
      const lines = codeExamples.javascript.split("\n");
      const lineNumber =
        lines.findIndex((line) => line.includes(searchDemoQuery)) + 1;
      setSearchDemoResults(lineNumber > 0 ? [lineNumber] : []);
    } catch (error) {
      console.error("Error in search functionality:", error);
      setSearchDemoResults([]);
    }
  }, [searchDemoQuery]);

  const handleSearchDemo = useCallback((query: string, results: number[]) => {
    setSearchDemoQuery(query);
    setSearchDemoResults(results);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        aria-hidden="true"
      />
      <div className="relative">
        <main className="max-w-6xl mx-auto px-6 py-16 space-y-20">
          {/* Hero Section */}
          <section className="text-left">
            <h2 className="text-5xl font-semibold mb-6 text-neutral-200">
              A Beautiful Code Block Component for React
            </h2>
            <p className="flex flex-col gap-4 text-xl text-gray-400 mb-8 max-w-4xl">
              Enhance your React applications with a feature-rich, customizable
              code display component. Simple, easy to use and understand API
              design with a "own your own" approach. NPM package will be
              avaialable soon, but for now you can copy the code from the repo
              or run the *highly experimental* installation script below.<br/><span className="flex  gap-2  font-semibold">Btw, the <a className="underline" href='#props'>beautiful props table</a> is is also made by me and open source with a decent API<div className="animate-pulse">👀</div></span>
              <span>
                Created by{" "}
                <a
                  href="https://github.com/remcostoeten"
                  className="text-neutral-100 font-bold hover:underline"
                >
                  @remcostoeten.
                </a>
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex space-x-4 mb-8">
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <a href="/single-file" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Single File Version
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-gray-700 hover:bg-gray-800"
              >
                <a
                  href="https://github.com/remcostoeten/beautifull-code-block"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </section>
          <section id="feature-showcase" className="text-left">
            <h3 className="text-2xl font-semibold mb-6 text-neutral-200">
              Feature Showcase
            </h3>
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="bg-gray-800 p-1 rounded-lg mb-4">
                <TabsTrigger
                  value="search"
                  className="data-[state=active]:bg-gray-700"
                >
                  Search
                </TabsTrigger>
                <TabsTrigger
                  value="file-name"
                  className="data-[state=active]:bg-gray-700"
                >
                  File Name
                </TabsTrigger>
                <TabsTrigger
                  value="badges"
                  className="data-[state=active]:bg-gray-700"
                >
                  Badges
                </TabsTrigger>
              </TabsList>

              <TabsContent value="search">
                <div className="space-y-4">
                  <p className="text-sm text-gray-400">
                    This demo shows the search functionality in action. The
                    search box is pre-filled with &quot;return userData&quot;
                    and the matching line is highlighted.
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
                  <div className="text-sm text-gray-400">
                    Search query:{" "}
                    <span className="text-white">{searchDemoQuery}</span>
                    <br />
                    Matching lines:{" "}
                    <span className="text-white">
                      {searchDemoResults.join(", ")}
                    </span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="file-name">
                <div className="space-y-4">
                  <p className="text-sm text-gray-400">
                    Display a file name at the top of the code block for better
                    context.
                  </p>
                  <CodeBlock
                    code={codeExamples.rust}
                    language="rust"
                    fileName="word_frequency.rs"
                    showLineNumbers
                  />
                </div>
              </TabsContent>

              <TabsContent value="badges">
                <div className="space-y-4">
                  <p className="text-sm text-gray-400">
                    Add badges to categorize or provide additional context to
                    your code blocks.
                  </p>
                  <CodeBlock
                    code={codeExamples.sql}
                    language="sql"
                    badges={[
                      { text: "SQL", variant: "default" },
                      { text: "Advanced", variant: "primary" },
                      { text: "Recursive", variant: "secondary" },
                      { text: "Optimized", variant: "success" },
                      { text: "Complex", variant: "warning" },
                      { text: "Experimental", variant: "danger" },
                    ]}
                    showLineNumbers
                  />
                </div>
              </TabsContent>
            </Tabs>
          </section>
          <section id="create-your-own">
            <h3 className="text-2xl font-semibold mb-6 text-neutral-200">
              Create Your Own
            </h3>
            <p className="text-gray-400 mb-6">
              Experiment with the CodeBlock component by creating your own
              custom code snippet. Use the form below to input your code, select
              a language, add badges, and see the result in real-time.
            </p>
            <CodeBlockCreator />
          </section>

          {/* Installation Section */}
          <InstallationSection />

          {/* API Reference Section */}
          <div id="props">
            <ApiReferenceSection />
          </div>

          {/* Usage Examples Section */}
          <section className="text-left">
            <h3 className="text-2xl font-semibold mb-6 text-neutral-200">
              Usage Examples
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-4">Basic Usage</h4>
                <CodeBlock
                  code={`import { CodeBlock } from '@/components/code-block/code-block'

export default function Example() {
  return (
    <CodeBlock
      code="console.log('Hello, World!');"
      language="javascript"
      showLineNumbers
    />
  )
}`}
                  language="typescript"
                  fileName="BasicExample.tsx"
                  showLineNumbers
                />
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">
                  Advanced Usage with All Features
                </h4>
                <CodeBlock
                  code={`import { CodeBlock } from '@/components/code-block/code-block'

export default function AdvancedExample() {
  const handleSearch = (query: string, results: number[]) => {
    console.log(\`Found matches at lines: \${results.join(', ')}\`)
  }

  const handleLineClick = (lineNumber: number) => {
    console.log(\`Line \${lineNumber} clicked\`)
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
}`}
                  language="typescript"
                  fileName="AdvancedExample.tsx"
                  showLineNumbers
                  badges={[
                    { text: "TypeScript", variant: "primary" },
                    { text: "React", variant: "secondary" },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Customization Section */}
          <section className="text-left">
            <h3 className="text-2xl font-semibold mb-6 text-neutral-200">
              Customization
            </h3>
            <p className="text-gray-400 mb-6">
              The CodeBlock component can be customized using Tailwind CSS
              classes or by modifying the component's source code. Here are some
              common customization examples:
            </p>
            <div className="grid gap-6">
              <div className="">
                <h4 className="text-xl font-semibold mb-4">
                  Theme Customization
                </h4>
                <p className="text-gray-400 mb-4">
                  You can customize the colors, typography, and spacing using
                  Tailwind CSS classes:
                </p>
                <CodeBlock
                  code={`<CodeBlock
  className="dark:bg-gray-900 rounded-xl shadow-lg"
  code={myCode}
  language="javascript"
  showLineNumbers
/>`}
                  language="jsx"
                  showLineNumbers
                />
              </div>

              <div className="">
                <h4 className="text-xl font-semibold mb-4">
                  Custom Badge Styles
                </h4>
                <p className="text-gray-400 mb-4">
                  Create your own badge variants by extending the component's
                  styles:
                </p>
                <CodeBlock
                  code={`// In your CSS or Tailwind config
.badge-custom {
  @apply bg-gradient-to-r from-pink-500 to-purple-500 text-white;
}

// In your component
<CodeBlock
  code={myCode}
  badges={[
    { text: 'Custom', variant: 'custom' }
  ]}
/>`}
                  language="jsx"
                  showLineNumbers
                />
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-gray-800 py-10 mt-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400">
                Created by{" "}
                <a
                  href="https://github.com/remcostoeten"
                  className="text-neutral-100 hover:underline"
                >
                  Remco Stoeten
                </a>
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/remcostoeten/beautifull-code-block/issues"
                  className="text-gray-400 hover:text-neutral-100"
                >
                  Report an Issue
                </a>
                <a
                  href="https://github.com/remcostoeten/beautifull-code-block/blob/main/LICENSE"
                  className="text-gray-400 hover:text-neutral-100"
                >
                  License
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
