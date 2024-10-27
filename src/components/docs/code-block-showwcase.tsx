'use client'

import { ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../code-block/button'
import { CodeBlock } from '../code-block/code-block'
import { CodeBlockCreator } from './block-creator'

export function CodeBlockShowcase() {
  const [activeTab, setActiveTab] = useState('typescript')
  const [searchDemo, setSearchDemo] = useState<{
    query: string;
    results: number[];
  }>({
    query: "",
    results: [],
  });

  const codeExamples = {
    typescript: `
import { useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.example.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: User[] = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong> ({user.email})
        </li>
      ))}
    </ul>
  );
};

export default UserList;
    `,
    python: `
def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers)
print("Sorted array:", sorted_numbers)
    `,
    rust: `
fn main() {
    let mut numbers = vec![1, 2, 3, 4, 5];
    
    println!("Before mutation: {:?}", numbers);
    
    // Mutate the vector
    numbers.push(6);
    numbers.remove(2);
    
    println!("After mutation: {:?}", numbers);
}
    `,
    sql: `
SELECT 
    e.employee_id,
    e.first_name,
    e.last_name,
    d.department_name
FROM
    employees e
        JOIN
    departments d ON e.department_id = d.department_id
WHERE
    e.salary > 50000
ORDER BY e.last_name;
    `,
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">CodeBlock</h1>
        <p className="text-xl text-center max-w-lg mb-8">
          A modern, feature-rich code block component for React applications.
        </p>
        <div className="flex space-x-4">
          <Button
            variant="link"
            className="flex items-center space-x-2"
            onClick={() => window.open('https://github.com/remcostoeten/beautifull-code-block', '_blank')}
          >
            <Github size={16} />
            <span>View on GitHub</span>
          </Button>
          <Button
            variant="secondary"
            className="flex items-center space-x-2"
            onClick={() => window.open('https://www.npmjs.com/package/beautifull-code-block', '_blank')}
          >
            <ExternalLink size={16} />
            <span>View on npm</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Live Demo</h2>
          <div className="flex mb-4">
            {Object.keys(codeExamples).map((language) => (
              <button
                key={language}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === language
                    ? 'bg-zinc-800 text-white'
                    : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                }`}
                onClick={() => setActiveTab(language)}
              >
                {language}
              </button>
            ))}
          </div>
          <CodeBlock
            code={codeExamples[activeTab as keyof typeof codeExamples]}
            language={activeTab}
            showLineNumbers
            enableLineHighlight
            onSearch={(query, results) => setSearchDemo({ query, results })}
          />
          {searchDemo.query && (
            <p className="mt-4">
              Search results for &quot;{searchDemo.query}&quot;: {searchDemo.results.join(', ')}
            </p>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Create Your Own</h2>
          <CodeBlockCreator />
        </div>
      </div>
    </div>
  )
}
