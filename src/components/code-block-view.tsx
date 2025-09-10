"use client";

import { CodeBlock } from "@/components/code-block"
import { MultiFileCodeBlock } from "@/components/multi-file-code-block"
import { DiffCodeBlock } from "@/components/diff-code-block"
import { useCallback, useEffect, useState } from "react";

const themeClasses = {
  title: "text-gray-900 dark:text-neutral-200",
  tabContainer: "dark:bg-[#0A0A0A] border dark:border-[#333]",
  tabActive: "bg-white text-gray-900 shadow-sm dark:bg-[#bbb]/10 dark:text-white",
  tabInactive: "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-[#0A0A0A]",
  description: "text-gray-600 dark:text-gray-400",
  highlight: "text-gray-900 font-medium dark:text-white",
};

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

(async () => {
  const userId = 123;
  const user = await fetchUserData(userId);
  if (user) {
    console.log('User data:', user);
  } else {
    console.log('Failed to fetch user data');
  }
})();`,

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

export function CodeBlockView() {
  const [activeTab, setActiveTab] = useState("search");
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
    <section id="feature-showcase" className="text-left   mx-auto  dark:bg-[rgb(11,11,11)]   w-screen  h-screen grid place-items-center">
      <div className="w-4/6">
        <div className={`${themeClasses.tabContainer} p-1 rounded-lg mb-4 flex`}>
          <button
            onClick={() => setActiveTab("search")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === "search"
              ? themeClasses.tabActive
              : themeClasses.tabInactive
              }`}
          >
            Search
          </button>
          <button
            onClick={() => setActiveTab("file-name")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === "file-name"
              ? themeClasses.tabActive
              : themeClasses.tabInactive
              }`}
          >
            File Name
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === "badges"
              ? themeClasses.tabActive
              : themeClasses.tabInactive
              }`}
          >
            Badges
          </button>
          <button
            onClick={() => setActiveTab("hover")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === "hover"
              ? themeClasses.tabActive
              : themeClasses.tabInactive
              }`}
          >
            Hover Highlight
          </button>
          <button
            onClick={() => setActiveTab("multi-file")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === "multi-file"
              ? themeClasses.tabActive
              : themeClasses.tabInactive
              }`}
          >
            Multi-file
          </button>
          <button
            onClick={() => setActiveTab("diff")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === "diff"
              ? themeClasses.tabActive
              : themeClasses.tabInactive
              }`}
          >
            Diff View
          </button>
        </div>

        {activeTab === "search" && (
          <div className="space-y-4">
            <p className={`text-sm ${themeClasses.description}`}>
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
            <div className={`text-sm ${themeClasses.description}`}>
              Search query:{" "}
              <span className={themeClasses.highlight}>{searchDemoQuery}</span>
              <br />
              Matching lines:{" "}
              <span className={themeClasses.highlight}>
                {searchDemoResults.join(", ")}
              </span>
            </div>
          </div>
        )}

        {activeTab === "file-name" && (
          <div className="space-y-4">
            <p className={`text-sm ${themeClasses.description}`}>
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
        )}

        {activeTab === "badges" && (
          <div className="space-y-4">
            <p className={`text-sm ${themeClasses.description}`}>
              Add badges to categorize or provide additional context to
              your code blocks.
            </p>
            <CodeBlock
              code={codeExamples.sql}
              language="sql"
              badges={[
                { text: "Advanced", variant: "primary" },
                { text: "Recursive", variant: "secondary" },

                { text: "Experimental", variant: "danger" },
              ]}
              showLineNumbers
            />
          </div>
        )}

        {activeTab === "hover" && (
          <div className="space-y-4">
            <p className={`text-sm ${themeClasses.description}`}>
              Hover over any line to see smooth highlighting. This feature works
              alongside click highlighting and search results with proper precedence.
            </p>
            <CodeBlock
              code={codeExamples.rust}
              language="rust"
              fileName="hover_demo.rs"
              showLineNumbers
              enableLineHover
              enableLineHighlight
              hoverHighlightColor="rgba(99, 102, 241, 0.1)"
            />
            <div className={`text-sm ${themeClasses.description}`}>
              <span className={themeClasses.highlight}>Features:</span>
              <br />
              • Hover highlighting with smooth transitions (160ms)
              <br />
              • Custom hover color support
              <br />
              • Proper priority: Click &gt; Search &gt; Hover
              <br />
              • Performance optimized - only renders when enabled
            </div>
          </div>
        )}

        {activeTab === "multi-file" && (
          <div className="space-y-4">
            <p className={`text-sm ${themeClasses.description}`}>
              Switch between multiple related files with a tabbed interface.
            </p>
            <MultiFileCodeBlock
              files={[
                {
                  name: "app.tsx",
                  language: "typescript",
                  code: `import { useState } from 'react';
import { UserProfile } from './user-profile';
import { Settings } from './settings';

export function App() {
  const [activeView, setActiveView] = useState('profile');
  
  return (
    <div className="p-4">
      {activeView === 'profile' ? <UserProfile /> : <Settings />}
    </div>
  );
}`,
                  badges: [{ text: "Component", variant: "primary" }],
                },
                {
                  name: "user-profile.tsx",
                  language: "typescript",
                  code: `export function UserProfile() {
  return (
    <div className="space-y-4">
      <h1>User Profile</h1>
      <div className="grid gap-4">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
      </div>
    </div>
  );
}`,
                  badges: [{ text: "Component", variant: "secondary" }],
                },
                {
                  name: "settings.tsx",
                  language: "typescript",
                  code: `export function Settings() {
  return (
    <div className="space-y-4">
      <h1>Settings</h1>
      <div className="grid gap-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Dark Mode
        </label>
      </div>
    </div>
  );
}`,
                  badges: [{ text: "Component", variant: "secondary" }],
                },
              ]}
              showLineNumbers
              enableLineHighlight
            />
          </div>
        )}

        {activeTab === "diff" && (
          <div className="space-y-4">
            <p className={`text-sm ${themeClasses.description}`}>
              View code changes with additions and deletions highlighted.
              Toggle between unified and split views.
            </p>
            <DiffCodeBlock
              fileName="user-service.ts"
              language="typescript"
              oldCode={`import { User } from './types';
import { database } from './database';

// User service for managing user operations
export class UserService {
  private users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  private async loadUsers() {
    this.users = await database.getUsers();
  }

  function greeting(name: string) {
    return 'Hello ' + name;
  }

  public async createUser(userData: Partial<User>): Promise<User> {
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date()
    };
    
    this.users.push(newUser);
    await database.saveUser(newUser);
    return newUser;
  }

  greeting('world');

  public getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  public async deleteUser(id: number): Promise<boolean> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;
    
    this.users.splice(index, 1);
    await database.deleteUser(id);
    return true;
  }
}`}
              newCode={`import { User } from './types';
import { database } from './database';
import { Logger } from './logger';

// User service for managing user operations
export class UserService {
  private users: User[] = [];
  private logger = new Logger('UserService');

  constructor() {
    this.loadUsers();
  }

  private async loadUsers() {
    this.users = await database.getUsers();
    this.logger.info('Users loaded successfully');
  }

  function greeting(name: string, title?: string) {
    const prefix = title ? title + ' ' : '';
    return 'Hello ' + prefix + name + '!';
  }

  public async createUser(userData: Partial<User>): Promise<User> {
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date()
    };
    
    this.users.push(newUser);
    await database.saveUser(newUser);
    this.logger.info('User created:', newUser.id);
    return newUser;
  }

  greeting('world', 'Mr.');

  public getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  public async deleteUser(id: number): Promise<boolean> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;
    
    this.users.splice(index, 1);
    await database.deleteUser(id);
    this.logger.info('User deleted:', id);
    return true;
  }
}`}
            />
          </div>
        )}


      </div>
    </section>
  );
}
