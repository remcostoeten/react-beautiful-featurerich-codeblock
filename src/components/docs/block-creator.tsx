"use client";

import { useState } from "react";
import { Button } from "../code-block/button";
import { CodeBlock } from "../code-block/code-block";
import * as Icons from "../code-block/icons";
import { Input } from "./Input";

type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "custom";

type SupportedLanguage =
  | "javascript"
  | "typescript"
  | "python"
  | "rust"
  | "sql"
  | "other";

const languageOptions: {
  value: SupportedLanguage;
  label: string;
  icon: JSX.Element;
}[] = [
  {
    value: "javascript",
    label: "JavaScript",
    icon: <Icons.JavascriptIcon size={16} />,
  },
  {
    value: "typescript",
    label: "TypeScript",
    icon: <Icons.TypescriptIcon size={16} />,
  },
  { value: "python", label: "Python", icon: <Icons.PythonIcon size={16} /> },
  { value: "rust", label: "Rust", icon: <Icons.RustIcon size={16} /> },
  { value: "sql", label: "SQL", icon: <Icons.SqlLogo size={16} /> },
  { value: "other", label: "Other", icon: <Icons.JavascriptIcon size={16} /> },
];

const demoData = {
  code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;`,
  language: "typescript" as SupportedLanguage,
  fileName: "Counter.tsx",
  badges: ["React", "Hooks", "TypeScript"],
  badgeVariant: "primary" as BadgeVariant,
};

export function CodeBlockCreator() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<SupportedLanguage>("javascript");
  const [fileName, setFileName] = useState("");
  const [badges, setBadges] = useState<string[]>([]);
  const [newBadge, setNewBadge] = useState("");
  const [badgeVariant, setBadgeVariant] = useState<BadgeVariant>("default");

  const handleAddBadge = () => {
    if (newBadge.trim() !== "") {
      setBadges([...badges, newBadge.trim()]);
      setNewBadge("");
    }
  };

  const fillWithDemoData = () => {
    setCode(demoData.code);
    setLanguage(demoData.language);
    setFileName(demoData.fileName);
    setBadges(demoData.badges);
    setBadgeVariant(demoData.badgeVariant);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code here..."
            className="w-full h-40 p-2 bg-[#111111] text-white border border-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <Button
              className="border px-4 py-2 bg-zinc-300 w-full text-black"
              onClick={fillWithDemoData}
            >
              Fill with demo data
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="w-full p-2 bg-[#111111] text-white border border-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languageOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="flex items-center"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <Input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="File name (optional)"
          />
          <div className="flex space-x-2">
            <Input
              value={newBadge}
              onChange={(e) => setNewBadge(e.target.value)}
              placeholder="Add badge"
              className="flex-grow"
            />
            <Button onClick={handleAddBadge}>Add Badge</Button>
          </div>
          <div>
            <label
              htmlFor="badgeVariant"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Badge Variant
            </label>
            <select
              id="badgeVariant"
              value={badgeVariant}
              onChange={(e) => setBadgeVariant(e.target.value as BadgeVariant)}
              className="w-full p-2 bg-[#111111] text-white border border-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Default</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <CodeBlock
          code={code || "// Your code will appear here"}
          language={language}
          fileName={fileName}
          badges={badges.map((badge) => ({
            text: badge,
            variant: badgeVariant,
          }))}
          showLineNumbers
          enableLineHighlight
        />
      </div>
    </div>
  );
}
