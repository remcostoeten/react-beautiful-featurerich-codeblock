"use client";

import React, { useState } from "react";
import { CodeBlock } from "./beautiful-code-block-ultra-optimized";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Package, 
  Search, 
  Copy, 
  Keyboard, 
  Palette, 
  Star, 
  Download,
  Github,
  ExternalLink,
  CheckCircle
} from "lucide-react";

/**
 * Beautiful Code Block Demo for 21.dev
 * 
 * Showcases the ultra-optimized version with all its features:
 * - 38% smaller bundle size
 * - 50% fewer dependencies  
 * - Support for 18+ programming languages
 * - Interactive search, copy, and keyboard shortcuts
 * - Custom badges and themes
 * - Full accessibility support
 */
export function BeautifulCodeBlockDemo() {
  const [activeDemo, setActiveDemo] = useState("typescript");
  const [searchResults, setSearchResults] = useState<number[]>([]);

  // Demo code examples
  const demoCode = {
    typescript: `// Beautiful Code Block - TypeScript Example
interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
  message?: string;
}

async function fetchUserData(userId: string): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch user");
    }

    return {
      data,
      status: "success"
    };
  } catch (error) {
    return {
      data: null,
      status: "error", 
      message: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

// Usage with proper error handling
const result = await fetchUserData("123");
if (result.status === "success") {
  console.log("User data:", result.data);
} else {
  console.error("Error:", result.message);
}`,

    python: `# Beautiful Code Block - Python Example
from typing import List, Optional, Dict, Any
import asyncio
import aiohttp
from dataclasses import dataclass

@dataclass
class ApiResponse:
    data: Any
    status: str
    message: Optional[str] = None

class UserService:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.session: Optional[aiohttp.ClientSession] = None
    
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def fetch_user(self, user_id: str) -> ApiResponse:
        """Fetch user data with proper error handling."""
        if not self.session:
            raise ValueError("Session not initialized. Use async context manager.")
        
        try:
            async with self.session.get(f"{self.base_url}/users/{user_id}") as response:
                data = await response.json()
                
                if response.status != 200:
                    return ApiResponse(
                        data=None,
                        status="error",
                        message=data.get("message", "Failed to fetch user")
                    )
                
                return ApiResponse(data=data, status="success")
        
        except Exception as e:
            return ApiResponse(
                data=None,
                status="error", 
                message=str(e)
            )

# Usage example
async def main():
    async with UserService("https://api.example.com") as service:
        result = await service.fetch_user("123")
        
        if result.status == "success":
            print(f"User data: {result.data}")
        else:
            print(f"Error: {result.message}")

# Run the async function
if __name__ == "__main__":
    asyncio.run(main())`,

    react: `// Beautiful Code Block - React Example
import React, { useState, useEffect, useCallback } from 'react';
import { User, ApiResponse } from './types';

interface UserProfileProps {
  userId: string;
  onUserLoad?: (user: User) => void;
  onError?: (error: string) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  userId, 
  onUserLoad, 
  onError 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(\`/api/users/\${id}\`);
      const result: ApiResponse<User> = await response.json();

      if (result.status === 'success') {
        setUser(result.data);
        onUserLoad?.(result.data);
      } else {
        const errorMsg = result.message || 'Failed to load user';
        setError(errorMsg);
        onError?.(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [onUserLoad, onError]);

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId, fetchUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading user...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={() => fetchUser(userId)}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {user && (
        <>
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-16 h-16 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-center">{user.name}</h2>
          <p className="text-gray-600 text-center">{user.email}</p>
          <div className="mt-4 flex justify-center space-x-2">
            {user.skills.map(skill => (
              <span 
                key={skill}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};`,

    rust: `// Beautiful Code Block - Rust Example
use std::collections::HashMap;
use serde::{Deserialize, Serialize};
use tokio;
use reqwest;
use anyhow::{Result, Context};

#[derive(Debug, Serialize, Deserialize)]
struct User {
    id: String,
    name: String,
    email: String,
    avatar: String,
    skills: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct ApiResponse<T> {
    data: Option<T>,
    status: String,
    message: Option<String>,
}

#[derive(Clone)]
struct UserService {
    client: reqwest::Client,
    base_url: String,
}

impl UserService {
    pub fn new(base_url: String) -> Self {
        Self {
            client: reqwest::Client::new(),
            base_url,
        }
    }

    pub async fn fetch_user(&self, user_id: &str) -> Result<User> {
        let url = format!("{}/users/{}", self.base_url, user_id);
        
        let response = self
            .client
            .get(&url)
            .send()
            .await
            .context("Failed to send request")?;

        if !response.status().is_success() {
            return Err(anyhow::anyhow!(
                "Request failed with status: {}", 
                response.status()
            ));
        }

        let api_response: ApiResponse<User> = response
            .json()
            .await
            .context("Failed to parse JSON response")?;

        match api_response.status.as_str() {
            "success" => api_response
                .data
                .ok_or_else(|| anyhow::anyhow!("No data in successful response")),
            _ => Err(anyhow::anyhow!(
                "API returned error: {}", 
                api_response.message.unwrap_or_else(|| "Unknown error".to_string())
            )),
        }
    }

    pub async fn fetch_multiple_users(&self, user_ids: &[String]) -> Result<Vec<User>> {
        let mut users = Vec::new();
        let mut handles = Vec::new();

        // Spawn concurrent requests
        for user_id in user_ids {
            let service = self.clone();
            let id = user_id.clone();
            
            let handle = tokio::spawn(async move {
                service.fetch_user(&id).await
            });
            
            handles.push(handle);
        }

        // Wait for all requests to complete
        for handle in handles {
            match handle.await? {
                Ok(user) => users.push(user),
                Err(e) => eprintln!("Failed to fetch user: {}", e),
            }
        }

        Ok(users)
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    let service = UserService::new("https://api.example.com".to_string());
    
    // Fetch single user
    match service.fetch_user("123").await {
        Ok(user) => println!("User: {:?}", user),
        Err(e) => eprintln!("Error: {}", e),
    }

    // Fetch multiple users concurrently
    let user_ids = vec!["123".to_string(), "456".to_string(), "789".to_string()];
    match service.fetch_multiple_users(&user_ids).await {
        Ok(users) => println!("Fetched {} users", users.len()),
        Err(e) => eprintln!("Error fetching users: {}", e),
    }

    Ok(())
}`,

    go: `// Beautiful Code Block - Go Example
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "net/http"
    "sync"
    "time"
)

type User struct {
    ID     string   \`json:"id"\`
    Name   string   \`json:"name"\`
    Email  string   \`json:"email"\`
    Avatar string   \`json:"avatar"\`
    Skills []string \`json:"skills"\`
}

type ApiResponse struct {
    Data    *User  \`json:"data"\`
    Status  string \`json:"status"\`
    Message string \`json:"message,omitempty"\`
}

type UserService struct {
    client  *http.Client
    baseURL string
}

func NewUserService(baseURL string) *UserService {
    return &UserService{
        client: &http.Client{
            Timeout: 30 * time.Second,
        },
        baseURL: baseURL,
    }
}

func (s *UserService) FetchUser(ctx context.Context, userID string) (*User, error) {
    url := fmt.Sprintf("%s/users/%s", s.baseURL, userID)
    
    req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
    if err != nil {
        return nil, fmt.Errorf("creating request: %w", err)
    }

    resp, err := s.client.Do(req)
    if err != nil {
        return nil, fmt.Errorf("making request: %w", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("request failed with status: %d", resp.StatusCode)
    }

    var apiResp ApiResponse
    if err := json.NewDecoder(resp.Body).Decode(&apiResp); err != nil {
        return nil, fmt.Errorf("decoding response: %w", err)
    }

    if apiResp.Status != "success" {
        return nil, fmt.Errorf("API error: %s", apiResp.Message)
    }

    if apiResp.Data == nil {
        return nil, fmt.Errorf("no data in successful response")
    }

    return apiResp.Data, nil
}

func (s *UserService) FetchMultipleUsers(ctx context.Context, userIDs []string) ([]*User, error) {
    var (
        users []User
        mu    sync.Mutex
        wg    sync.WaitGroup
    )

    // Channel to collect errors
    errCh := make(chan error, len(userIDs))

    // Fetch users concurrently
    for _, userID := range userIDs {
        wg.Add(1)
        go func(id string) {
            defer wg.Done()
            
            user, err := s.FetchUser(ctx, id)
            if err != nil {
                errCh <- fmt.Errorf("fetching user %s: %w", id, err)
                return
            }

            mu.Lock()
            users = append(users, *user)
            mu.Unlock()
        }(userID)
    }

    // Wait for all goroutines to finish
    wg.Wait()
    close(errCh)

    // Collect any errors
    var errs []error
    for err := range errCh {
        errs = append(errs, err)
    }

    if len(errs) > 0 {
        return nil, fmt.Errorf("encountered %d errors: %v", len(errs), errs[0])
    }

    // Convert to pointer slice
    result := make([]*User, len(users))
    for i := range users {
        result[i] = &users[i]
    }

    return result, nil
}

func main() {
    service := NewUserService("https://api.example.com")
    ctx := context.Background()

    // Fetch single user
    user, err := service.FetchUser(ctx, "123")
    if err != nil {
        fmt.Printf("Error: %v\n", err)
    } else {
        fmt.Printf("User: %+v\n", user)
    }

    // Fetch multiple users
    userIDs := []string{"123", "456", "789"}
    users, err := service.FetchMultipleUsers(ctx, userIDs)
    if err != nil {
        fmt.Printf("Error fetching multiple users: %v\n", err)
    } else {
        fmt.Printf("Fetched %d users\n", len(users))
        for _, u := range users {
            fmt.Printf("- %s (%s)\n", u.Name, u.Email)
        }
    }
}`
  };

  const handleSearch = (query: string, results: number[]) => {
    setSearchResults(results);
  };

  const handleCopy = (code: string) => {
    console.log(`Copied ${code.length} characters to clipboard`);
  };

  const handleLineClick = (lineNumber: number) => {
    console.log(`Clicked line ${lineNumber}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Beautiful Code Block
            <span className="block text-2xl font-normal text-gray-600 mt-2">
              Ultra-Optimized React Component
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Feature-rich syntax highlighting with interactive search, copy functionality, 
            and custom themes. Now 38% smaller with 50% fewer dependencies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Badge variant="outline" className="text-sm">
              <Package className="w-4 h-4 mr-1" />
              38% Smaller Bundle
            </Badge>
            <Badge variant="outline" className="text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              50% Fewer Dependencies
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Star className="w-4 h-4 mr-1" />
              18+ Languages
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Keyboard className="w-4 h-4 mr-1" />
              Full Accessibility
            </Badge>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <a href="#demo">
                <ExternalLink className="w-4 h-4 mr-2" />
                Try Interactive Demo
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/remcostoeten/react-beautiful-featurerich-codeblock">
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#installation">
                <Download className="w-4 h-4 mr-2" />
                Installation Guide
              </a>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Interactive Search</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built-in search with Cmd/Ctrl+F, highlighting matches, and keyboard navigation
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                <Copy className="w-5 h-5 text-green-600" />
              </div>
              <CardTitle className="text-lg">One-Click Copy</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Copy entire code blocks with Cmd/Ctrl+C or click the copy button
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <Palette className="w-5 h-5 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Custom Themes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Beautiful syntax highlighting with custom badges and color schemes
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Ultra Optimized</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                38% smaller bundle, 50% fewer dependencies, same great features
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Demo */}
        <Card className="mb-12" id="demo">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Interactive Demo
            </CardTitle>
            <CardDescription>
              Try the search (Cmd/Ctrl+F), copy (Cmd/Ctrl+C), and line highlighting features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Language Selector */}
            <Tabs value={activeDemo} onValueChange={setActiveDemo}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="rust">Rust</TabsTrigger>
                <TabsTrigger value="go">Go</TabsTrigger>
              </TabsList>

              {Object.entries(demoCode).map(([lang, code]) => (
                <TabsContent key={lang} value={lang} className="mt-6">
                  <CodeBlock
                    code={code}
                    language={lang}
                    fileName={`example.${
                      lang === 'typescript' ? 'ts' : 
                      lang === 'python' ? 'py' : 
                      lang === 'react' ? 'tsx' :
                      lang === 'rust' ? 'rs' :
                      lang === 'go' ? 'go' : lang
                    }`}
                    badges={[
                      { text: lang.toUpperCase(), variant: "primary" },
                      { text: "Interactive", variant: "success" },
                      { text: "Ultra-Optimized", variant: "custom" }
                    ]}
                    showLineNumbers
                    enableLineHighlight
                    showMetaInfo
                    onCopy={handleCopy}
                    onLineClick={handleLineClick}
                    onSearch={handleSearch}
                    className="rounded-lg border"
                  />
                </TabsContent>
              ))}
            </Tabs>

            {searchResults.length > 0 && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <Search className="w-4 h-4 inline mr-1" />
                  Found {searchResults.length} matches. Use Enter/Shift+Enter to navigate.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Installation Guide */}
        <Card className="mb-12" id="installation">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Quick Installation
            </CardTitle>
            <CardDescription>
              Get started with the Beautiful Code Block in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Install dependencies</h4>
                <CodeBlock
                  code="npm install framer-motion lucide-react react-syntax-highlighter clsx"
                  language="bash"
                  badges={[{ text: "NPM", variant: "secondary" }]}
                  showLineNumbers={false}
                  className="text-sm"
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Copy the component</h4>
                <CodeBlock
                  code={`// Download the ultra-optimized version
curl -O https://raw.githubusercontent.com/remcostoeten/react-beautiful-featurerich-codeblock/main/beautiful-code-block-ultra-optimized.tsx`}
                  language="bash"
                  badges={[{ text: "Download", variant: "success" }]}
                  showLineNumbers={false}
                  className="text-sm"
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">3. Import and use</h4>
                <CodeBlock
                  code={`import { CodeBlock } from './beautiful-code-block-ultra-optimized';

export function MyComponent() {
  return (
    <CodeBlock
      code="console.log('Hello, 21.dev!');"
      language="javascript"
      fileName="hello.js"
      badges={[{ text: 'JS', variant: 'primary' }]}
      showLineNumbers
      enableLineHighlight
      onCopy={(code) => console.log('Copied!', code)}
    />
  );
}`}
                  language="tsx"
                  fileName="my-component.tsx"
                  badges={[
                    { text: "React", variant: "primary" },
                    { text: "TypeScript", variant: "secondary" }
                  ]}
                  showLineNumbers
                  className="text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bundle Size Comparison */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Bundle Size Optimization
            </CardTitle>
            <CardDescription>
              Significant improvements in bundle size and dependencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-500 mb-1">~45KB</div>
                <div className="text-sm text-gray-600 mb-2">Original Version</div>
                <div className="text-xs text-gray-500">6 dependencies</div>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-yellow-500 mb-1">~31KB</div>
                <div className="text-sm text-gray-600 mb-2">Optimized Version</div>
                <div className="text-xs text-gray-500">6 dependencies</div>
              </div>

              <div className="text-center p-4 border-2 border-green-500 rounded-lg bg-green-50">
                <div className="text-2xl font-bold text-green-600 mb-1">~28KB</div>
                <div className="text-sm text-gray-600 mb-2">Ultra-Optimized</div>
                <div className="text-xs text-gray-500">3 dependencies</div>
                <Badge className="mt-2 bg-green-600">Recommended</Badge>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Removed Dependencies:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>❌ @radix-ui/react-slot (unused asChild functionality)</li>
                <li>❌ class-variance-authority (replaced with simple function)</li>
                <li>❌ tailwind-merge (custom className merger)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Built with ❤️ for the React community
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/remcostoeten/react-beautiful-featurerich-codeblock">
                <Github className="w-4 h-4 mr-2" />
                Star on GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://21.dev">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit 21.dev
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
