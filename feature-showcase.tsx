"use client";

import { CodeBlock } from "./beautiful-code-block-ultra-optimized";
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

export function FeatureShowcase() {
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
    <section id="feature-showcase" className="text-left">
      <h3 className="text-2xl font-semibold mb-6 text-neutral-200">
        Feature Showcase
      </h3>
      <div className="w-full">
        <div className="bg-gray-800 p-1 rounded-lg mb-4 flex">
          <button
            onClick={() => setActiveTab("search")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              activeTab === "search"
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Search
          </button>
          <button
            onClick={() => setActiveTab("file-name")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              activeTab === "file-name"
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            File Name
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              activeTab === "badges"
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Badges
          </button>
        </div>

        {activeTab === "search" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              This demo shows the search functionality in action. The
              search box is pre-filled with "return userData"
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
        )}

        {activeTab === "file-name" && (
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
        )}

        {activeTab === "badges" && (
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
        )}
      </div>
    </section>
  );
}
