/**
 * Beautiful Code Block Usage Examples
 * 
 * This file demonstrates how to use the Beautiful Code Block component
 * in various scenarios with different configurations.
 */

"use client";

import { CodeBlock } from "./beautiful-code-block";

// Example code snippets
const codeExamples = {
  typescript: `interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

async function fetchUser(id: number): Promise<User | null> {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}`,

  javascript: `const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];

const adults = users
  .filter(user => user.age >= 18)
  .map(user => ({
    ...user,
    isAdult: true
  }));

console.log(adults);`,

  python: `import asyncio
import aiohttp

async def fetch_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

async def main():
    urls = [
        'https://api.example.com/users',
        'https://api.example.com/posts'
    ]
    
    tasks = [fetch_data(url) for url in urls]
    results = await asyncio.gather(*tasks)
    
    for result in results:
        print(result)

if __name__ == "__main__":
    asyncio.run(main())`,
};

export function BeautifulCodeBlockExamples() {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold">Beautiful Code Block Examples</h1>
      
      {/* Basic Example */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
        <CodeBlock
          code={codeExamples.javascript}
          language="javascript"
          showLineNumbers
        />
      </section>

      {/* With File Name and Badges */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">With File Name and Badges</h2>
        <CodeBlock
          code={codeExamples.typescript}
          language="typescript"
          fileName="user-service.ts"
          badges={[
            { text: "TypeScript", variant: "primary" },
            { text: "API", variant: "secondary" },
            { text: "Async", variant: "success" }
          ]}
          showLineNumbers
        />
      </section>

      {/* Custom Badges */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Custom Badges</h2>
        <p className="text-gray-600 mb-4">
          Make sure to add the corresponding CSS classes to your globals.css:
        </p>
        <CodeBlock
          code={`/* Add to your globals.css */
@layer components {
  .badge-neon {
    @apply bg-gradient-to-r from-cyan-400 to-blue-500 text-black border border-cyan-400/50 shadow-lg shadow-cyan-400/25;
  }
  
  .badge-fire {
    @apply bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white border border-orange-500/40;
  }
}`}
          language="css"
          fileName="globals.css"
          badges={[
            { text: "Neon", variant: "custom", customClass: "bg-gradient-to-r from-cyan-400 to-blue-500 text-black border border-cyan-400/50" },
            { text: "Fire", variant: "custom", customClass: "bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white border border-orange-500/40" },
            { text: "Custom", variant: "custom" }
          ]}
        />
      </section>

      {/* Interactive Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Interactive Features</h2>
        <CodeBlock
          code={codeExamples.python}
          language="python"
          fileName="async-example.py"
          badges={[{ text: "Python", variant: "warning" }]}
          enableLineHighlight
          showLineNumbers
          onCopy={(code) => console.log('Copied:', code.substring(0, 50) + '...')}
          onLineClick={(line) => console.log('Clicked line:', line)}
          onSearch={(query, results) => console.log('Search:', query, 'Results:', results)}
          initialHighlightedLines={[1, 2, 3]}
        />
      </section>

      {/* Compact Version */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Compact Version</h2>
        <CodeBlock
          code="const greeting = 'Hello, World!';\nconsole.log(greeting);"
          language="javascript"
          showLineNumbers={false}
          showMetaInfo={false}
          maxHeight="200px"
          badges={[{ text: "JS", variant: "primary" }]}
        />
      </section>

      {/* Installation Instructions */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <div className="space-y-4">
          <p>1. Install the required dependencies:</p>
          <CodeBlock
            code="npm install framer-motion lucide-react react-syntax-highlighter clsx tailwind-merge @radix-ui/react-slot class-variance-authority"
            language="bash"
            showLineNumbers={false}
            badges={[{ text: "Install", variant: "success" }]}
          />
          
          <p>2. Copy the component file to your project and import:</p>
          <CodeBlock
            code={`import { CodeBlock } from './beautiful-code-block';

function MyComponent() {
  return (
    <CodeBlock
      code="const hello = 'world';"
      language="javascript"
      showLineNumbers
    />
  );
}`}
            language="tsx"
            fileName="my-component.tsx"
            badges={[{ text: "Usage", variant: "primary" }]}
          />
        </div>
      </section>
    </div>
  );
}

export default BeautifulCodeBlockExamples;
