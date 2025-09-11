import { cn } from "@/helpers/cn";
import { CodeBlock } from "@/components/code-block";
import { useState } from "react";
import { ChevronDown, ChevronRight, Settings, ScrollText, ArrowDown } from "lucide-react";

type TPropsPanelProps = {
  className?: string;
};

export function PropsPanel({ className }: TPropsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const allProps = [
    // Core Props
    {
      category: "Core",
      props: [
        {
          name: "code",
          type: "string",
          required: true,
          description: "The code content to display"
        },
        {
          name: "language",
          type: "string",
          required: true,
          description: "Programming language for syntax highlighting"
        }
      ]
    },
    // Display Props
    {
      category: "Display",
      props: [
        {
          name: "fileName",
          type: "string",
          required: false,
          description: "The name of the file to display in the header"
        },
        {
          name: "fileNameColor",
          type: "string",
          required: false,
          description: "Custom color for file name label"
        },
        {
          name: "showLineNumbers",
          type: "boolean",
          defaultValue: "true",
          required: false,
          description: "Shows line numbers on the left side"
        },
        {
          name: "showIcon",
          type: "boolean",
          defaultValue: "false",
          required: false,
          description: "Shows the language icon in the header"
        },
        {
          name: "showMetaInfo",
          type: "boolean",
          defaultValue: "true",
          required: false,
          description: "Show metadata like line count in header"
        },
        {
          name: "showBottomFade",
          type: "boolean",
          defaultValue: "true",
          required: false,
          description: "Show bottom fade effect"
        }
      ]
    },
    // Badge Props
    {
      category: "Badges",
      props: [
        {
          name: "badges",
          type: "Array<{ text: string; variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' }>",
          required: false,
          description: "Array of badge objects with text and color variant"
        },
        {
          name: "badgeColor",
          type: "string",
          required: false,
          description: "Custom color for badges"
        },
        {
          name: "enableAutoScroll",
          type: "boolean",
          defaultValue: "true",
          required: false,
          description: "Enable auto-scroll for badges"
        }
      ]
    },
    // Highlighting Props
    {
      category: "Highlighting",
      props: [
        {
          name: "enableLineHighlight",
          type: "boolean",
          defaultValue: "false",
          required: false,
          description: "Enable interactive line highlighting"
        },
        {
          name: "enableLineHover",
          type: "boolean",
          defaultValue: "false",
          required: false,
          description: "Enable hover highlighting for lines"
        },
        {
          name: "hoverHighlightColor",
          type: "string",
          defaultValue: "rgba(255, 255, 255, 0.1) for dark, rgba(0, 0, 0, 0.05) for light",
          required: false,
          description: "Custom color for hover highlighting"
        },
        {
          name: "initialHighlightedLines",
          type: "number[]",
          required: false,
          description: "Initially highlighted line numbers"
        }
      ]
    },
    // Search Props
    {
      category: "Search",
      props: [
        {
          name: "onSearch",
          type: "(query: string, results: number[]) => void",
          required: false,
          description: "Callback function called when search is performed"
        },
        {
          name: "initialSearchQuery",
          type: "string",
          required: false,
          description: "Pre-fills the search input with this query"
        },
        {
          name: "initialSearchResults",
          type: "number[]",
          required: false,
          description: "Pre-highlights these line numbers as search results"
        }
      ]
    },
    // Sizing Props
    {
      category: "Sizing",
      props: [
        {
          name: "width",
          type: "string",
          required: false,
          description: "Custom width (CSS value)"
        },
        {
          name: "height",
          type: "string",
          required: false,
          description: "Custom height (CSS value)"
        },
        {
          name: "maxHeight",
          type: "string",
          defaultValue: "400px",
          required: false,
          description: "Maximum height before scrolling"
        },
        {
          name: "resizable",
          type: "boolean",
          defaultValue: "false",
          required: false,
          description: "Enable resizing with corner handles"
        },
        {
          name: "resizeStorageKey",
          type: "string",
          defaultValue: "codeblock-resize",
          required: false,
          description: "localStorage key for persisting resize dimensions"
        }
      ]
    },
    // Control Props
    {
      category: "Controls",
      props: [
        {
          name: "disableSearch",
          type: "boolean",
          defaultValue: "false",
          required: false,
          description: "Disable search functionality entirely"
        },
        {
          name: "disableCopy",
          type: "boolean",
          defaultValue: "false",
          required: false,
          description: "Disable copy functionality entirely"
        },
        {
          name: "disableTopBar",
          type: "boolean",
          defaultValue: "false",
          required: false,
          description: "Disable the entire top bar/header"
        }
      ]
    },
    // Callback Props
    {
      category: "Callbacks",
      props: [
        {
          name: "onCopy",
          type: "(code: string) => void",
          required: false,
          description: "Callback when code is copied"
        },
        {
          name: "onLineClick",
          type: "(lineNumber: number) => void",
          required: false,
          description: "Callback when a line is clicked"
        }
      ]
    },
    // Styling Props
    {
      category: "Styling",
      props: [
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes"
        },
        {
          name: "style",
          type: "React.CSSProperties",
          required: false,
          description: "Inline styles"
        }
      ]
    }
  ];

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className || "")}>
      {/* Toggle Button */}
      <button
        data-props-panel-toggle
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-[#333333] rounded-lg shadow-lg hover:shadow-xl transition-all duration-200",
          "text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
        )}
      >
        <Settings size={16} />
        <span>All Props</span>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-96 max-h-[80vh] bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-[#333333] rounded-lg shadow-xl">
          {/* Header with scroll indicator */}
          <div className="sticky top-0 bg-white dark:bg-[#0A0A0A] border-b border-zinc-200 dark:border-[#333333] p-4 rounded-t-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                CodeBlock Props Reference
              </h3>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <ScrollText size={12} />
                <span>Scroll to see all</span>
              </div>
            </div>
            
            {/* Quick navigation button */}
            <button
              onClick={() => {
                // Scroll to the current demo's PropShowcase
                const currentDemo = document.querySelector('[data-demo-active="true"]');
                if (currentDemo) {
                  const propShowcase = currentDemo.querySelector('[data-prop-showcase]');
                  if (propShowcase) {
                    propShowcase.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-colors text-sm font-medium"
            >
              <ArrowDown size={14} />
              <span>Go to Current Demo Props</span>
            </button>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
            <div className="p-4">
            
            <div className="space-y-6">
              {allProps.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-3 border-b border-zinc-200 dark:border-[#333333] pb-1">
                    {category.category}
                  </h4>
                  <div className="space-y-3">
                    {category.props.map((prop, propIndex) => (
                      <div key={propIndex} className="bg-zinc-50 dark:bg-[#111111] rounded-lg p-3 border border-zinc-200 dark:border-[#333333]">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <code className="px-2 py-1 bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 rounded text-xs font-mono font-medium border border-gray-200 dark:border-gray-800">
                            {prop.name}
                          </code>
                          {prop.required && (
                            <span className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded text-xs font-medium border border-red-200 dark:border-red-800">
                              required
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-zinc-100 dark:bg-[#222222] text-zinc-700 dark:text-zinc-300 rounded text-xs font-mono border border-zinc-200 dark:border-[#444444]">
                            {prop.type}
                          </span>
                          {prop.defaultValue && (
                            <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded text-xs font-medium border border-emerald-200 dark:border-emerald-800">
                              default: {prop.defaultValue}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {prop.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Example Usage */}
            <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-[#333333]">
              <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-3 text-center">
                Complete Example
              </h4>
              <div className="bg-zinc-50 dark:bg-[#111111] rounded-lg border border-zinc-200 dark:border-[#333333] overflow-hidden">
                <CodeBlock
                  code={`<CodeBlock
  code="console.log('Hello World');"
  language="javascript"
  fileName="example.js"
  showLineNumbers={true}
  enableLineHighlight={true}
  enableLineHover={true}
  badges={[
    { text: "Example", variant: "primary" }
  ]}
  resizable={true}
  showIcon={true}
  onSearch={(query, results) => console.log(query, results)}
  onCopy={(code) => console.log('Copied:', code)}
/>`}
                  language="tsx"
                  disableTopBar={true}
                  showLineNumbers={false}
                  className="text-xs"
                />
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
