"use client";

import { Button } from "@/components/code-block/button";
import CodeBlock from "@/components/code-block/code-block";
import { Github } from "lucide-react";
import { useState } from "react";
export default function CodeBlockDemoPage() {
  const [activeTab, setActiveTab] = useState('typescript')
  const [searchDemo, setSearchDemo] = useState({ query: '', results: [] })

  const codeExamples = {
    typescript: `
import { useState, useEffect } from 'react';

interface User {
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
import asyncio
import aiohttp
from typing import List, Dict

class WeatherAPI:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.openweathermap.org/data/2.5/weather"

    async def get_weather(self, city: str) -> Dict:
        params = {
            "q": city,
            "appid": self.api_key,
            "units": "metric"
        }
        async with aiohttp.ClientSession() as session:
            async with session.get(self.base_url, params=params) as response:
                if response.status == 200:
                    data = await response.json()
                    return {
                        "city": data["name"],
                        "temperature": data["main"]["temp"],
                        "description": data["weather"][0]["description"]
                    }
                else:
                    raise Exception(f"Error fetching weather for {city}")

async def get_multiple_weather(api_key: str, cities: List[str]) -> List[Dict]:
    api = WeatherAPI(api_key)
    tasks = [api.get_weather(city) for city in cities]
    return await asyncio.gather(*tasks)

async def main():
    api_key = "your_api_key_here"
    cities = ["London", "New York", "Tokyo", "Sydney", "Paris"]
    
    try:
        weather_data = await get_multiple_weather(api_key, cities)
        for data in weather_data:
            print(f"{data['city']}: {data['temperature']}°C, {data['description']}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    asyncio.run(main())
    `,
    rust: `
use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use tokio::sync::mpsc;
use tokio::time::{self, Duration};

#[derive(Debug, Clone)]
struct Task {
    id: u64,
    description: String,
    completed: bool,
}

#[derive(Debug)]
enum Message {
    AddTask(Task),
    CompleteTask(u64),
    GetTasks,
}

struct TaskManager {
    tasks: Arc<Mutex<HashMap<u64, Task>>>,
}

impl TaskManager {
    fn new() -> Self {
        TaskManager {
            tasks: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    async fn add_task(&self, task: Task) {
        let mut tasks = self.tasks.lock().unwrap();
        tasks.insert(task.id, task);
    }

    async fn complete_task(&self, id: u64) -> bool {
        let mut tasks = self.tasks.lock().unwrap();
        if let Some(task) = tasks.get_mut(&id) {
            task.completed = true;
            true
        } else {
            false
        }
    }

    async fn get_tasks(&self) -> Vec<Task> {
        let tasks = self.tasks.lock().unwrap();
        tasks.values().cloned().collect()
    }
}

#[tokio::main]
async fn main() {
    let task_manager = Arc::new(TaskManager::new());
    let (tx, mut rx) = mpsc::channel(32);

    // Spawn a task to handle incoming messages
    let tm = task_manager.clone();
    tokio::spawn(async move {
        while let Some(msg) = rx.recv().await {
            match msg {
                Message::AddTask(task) => tm.add_task(task).await,
                Message::CompleteTask(id) => {
                    let result = tm.complete_task(id).await;
                    println!("Task {} completed: {}", id, result);
                }
                Message::GetTasks => {
                    let tasks = tm.get_tasks().await;
                    println!("Current tasks: {:?}", tasks);
                }
            }
        }
    });

    // Simulate adding tasks
    for i in 1..=5 {
        let task = Task {
            id: i,
            description: format!("Task {}", i),
            completed: false,
        };
        tx.send(Message::AddTask(task)).await.unwrap();
    }

    // Simulate completing tasks
    time::sleep(Duration::from_secs(1)).await;
    tx.send(Message::CompleteTask(2)).await.unwrap();
    tx.send(Message::CompleteTask(4)).await.unwrap();

    // Get and display all tasks
    time::sleep(Duration::from_secs(1)).await;
    tx.send(Message::GetTasks).await.unwrap();

    // Wait for a moment to allow all tasks to complete
    time::sleep(Duration::from_secs(2)).await;
}
    `,
    sql: `
-- Create tables
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL
);

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Insert sample data
INSERT INTO customers (first_name, last_name, email) VALUES
('John', 'Doe', 'john@example.com'),
('Jane', 'Smith', 'jane@example.com'),
('Bob', 'Johnson', 'bob@example.com');

INSERT INTO products (name, description, price, stock_quantity) VALUES
('Laptop', 'High-performance laptop', 999.99, 50),
('Smartphone', 'Latest model smartphone', 699.99, 100),
('Headphones', 'Noise-cancelling headphones', 199.99, 200);

INSERT INTO orders (customer_id, total_amount) VALUES
(1, 1199.98),
(2, 699.99),
(3, 1899.97);

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 999.99),
(1, 3, 1, 199.99),
(2, 2, 1, 699.99),
(3, 1, 1, 999.99),
(3, 2, 1, 699.99),
(3, 3, 1, 199.99);

-- Complex query to get order summary
SELECT 
    o.order_id,
    c.first_name || ' ' || c.last_name AS customer_name,
    o.order_date,
    SUM(oi.quantity) AS total_items,
    o.total_amount,
    STRING_AGG(p.name, ', ') AS products
FROM 
    orders o
    JOIN customers c ON o.customer_id = c.customer_id
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
GROUP BY 
    o.order_id, c.customer_id
ORDER BY 
    o.order_date DESC;

-- Query to get product sales ranking
SELECT 
    p.name,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.quantity * oi.price) AS total_revenue,
    RANK() OVER (ORDER BY SUM(oi.quantity * oi.price) DESC) AS sales_rank
FROM 
    products p
    LEFT JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY 
    p.product_id
ORDER BY 
    total_revenue DESC;
    `
  }

  const handleSearch = (query: string, results: number[]) => {
    setSearchDemo({ query, results })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold">BeautifulCodeBlock</h1>
              <p className="mt-2 text-lg text-zinc-400">
                A modern, feature-rich code block component with syntax highlighting and interactive features
              </p>
              <div className="flex items-center gap-2 mt-4">
                <a
                  href="https://github.com/yourusername/beautiful-code-block"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  by @yourusername
                </a>
              </div>
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() =>
                window.open(
                  "https://github.com/yourusername/beautiful-code-block",
                  "_blank",
                )
              }
            >
              <Github size={18} />
              View on GitHub
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="space-y-16">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Installation</h2>
            <CodeBlock
              code="npm install @yourusername/beautiful-code-block"
              fileName="terminal"
              language="bash"
              badges={["npm"]}
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Basic Usage</h2>
            <CodeBlock
              code={`import { CodeBlock } from '@yourusername/beautiful-code-block'

export default function Page() {
  return (
    <CodeBlock
      code={code}
      fileName="example.ts"
      language="typescript"
      badges={['npm']}
      showLineNumbers
      enableLineHighlight
    />
  )
}`}
              fileName="page.tsx"
              language="typescript"
              badges={["example"]}
              showLineNumbers
              enableLineHighlight
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Interactive Examples</h2>
            <div className="flex space-x-2 mb-4">
              {Object.keys(codeExamples).map((lang) => (
                <Button
                  key={lang}
                  variant={activeTab === lang ? "default" : "outline"}
                  onClick={() => setActiveTab(lang)}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </Button>
              ))}
            </div>
            <CodeBlock
              code={codeExamples[activeTab]}
              fileName={`example.${activeTab}`}
              language={activeTab}
              badges={["interactive"]}
              showLineNumbers
              enableLineHighlight
              showMetaInfo
              onSearch={handleSearch}
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Search Functionality Demo</h2>
            <div className="bg-[#111111] p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Search Results</h3>
              {searchDemo.query ? (
                <div>
                  <p>Query: "{searchDemo.query}"</p>
                  <p>Results: {searchDemo.results.length} matches</p>
                  <p>Matching lines: {searchDemo.results.join(', ')}</p>
                </div>
              ) : (
                <p>Use the search feature in the code block above to see results here.</p>
              )}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Syntax Highlighting",
                  description: "Support for 180+ programming languages with customizable themes.",
                },
                {
                  title: "Line Highlighting",
                  description: "Click to highlight specific lines of code for emphasis.",
                },
                {
                  title: "Search Functionality",
                  description: "Built-in search with result navigation and highlighting.",
                },
                {
                  title: "Copy to Clipboard",
                  description: "One-click code copying with visual feedback.",
                },
                {
                  title: "Collapsible Interface",
                  description: "Toggle code visibility for a cleaner presentation.",
                },
                {
                  title: "Keyboard Shortcuts",
                  description: "Efficient navigation and interaction using keyboard commands.",
                },
                {
                  title: "Customizable Appearance",
                  description: "Adjust colors, fonts, and layout to match your design.",
                },
                {
                  
                  title: "Responsive Design",
                  description: "Adapts seamlessly to different screen sizes and devices.",
                },
                {
                  title: "Accessibility Features",
                  description: "Designed with keyboard navigation and screen readers in mind.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border border-[#333333] bg-[#111111]"
                >
                  <h3 className="font-medium text-zinc-200 mb-2">{feature.title}</h3>
                  <p className="text-sm text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Configuration Options</h2>
            <CodeBlock
              code={`interface CodeBlockProps {
  code: string;
  fileName: string;
  language: string;
  badges?: string[];
  showLineNumbers?: boolean;
  enableLineHighlight?: boolean;
  showMetaInfo?: boolean;
  maxHeight?: string;
  className?: string;
  onCopy?: (code: string) => void;
  onLineClick?: (lineNumber: number) => void;
  onSearch?: (query: string, results: number[]) => void;
}`}
              fileName="CodeBlockProps.ts"
              language="typescript"
              badges={["props"]}
              showLineNumbers
            />
          </section>
        </div>
      </main>

      <footer className="border-t border-[#333333] mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">
              Built with ❤️ by{" "}
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-white transition-colors"
              >
                @yourusername
              </a>
            </p>
            <a
              href="https://github.com/yourusername/beautiful-code-block"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
