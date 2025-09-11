import { cn } from "@/helpers/cn";
import { CodeBlock } from "@/components/code-block";

type TPropShowcaseProps = {
  title: string;
  description: string;
  props: Array<{
    name: string;
    type: string;
    defaultValue?: string;
    description: string;
  }>;
  className?: string;
  "data-prop-showcase"?: boolean;
};

export function PropShowcase({
  title,
  description,
  props,
  className,
  "data-prop-showcase": dataPropShowcase,
}: TPropShowcaseProps) {
  return (
    <div 
      className={cn("mt-6 p-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-[#111111] dark:to-[#0A0A0A] rounded-xl border border-zinc-200 dark:border-[#333333] shadow-sm", className || "")}
      data-prop-showcase={dataPropShowcase}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            {title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        {/* Props Grid */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider text-center">
            Props Used
          </h4>
          <div className="space-y-2">
            {props.map((prop, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-[#0A0A0A] rounded-lg border border-zinc-200 dark:border-[#333333] hover:bg-zinc-50 dark:hover:bg-[#111111] transition-colors">
                {/* Prop Name */}
                <code className="px-2 py-1 bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 rounded text-xs font-mono font-medium border border-gray-200 dark:border-gray-800 flex-shrink-0">
                  {prop.name}
                </code>
                
                {/* Type */}
                <span className="px-2 py-1 bg-zinc-100 dark:bg-[#222222] text-zinc-700 dark:text-zinc-300 rounded text-xs font-mono border border-zinc-200 dark:border-[#444444] flex-shrink-0">
                  {prop.type}
                </span>
                
                {/* Default */}
                {prop.defaultValue && (
                  <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded text-xs font-medium border border-emerald-200 dark:border-emerald-800 flex-shrink-0">
                    {prop.defaultValue}
                  </span>
                )}
                
                {/* Description */}
                <p className="text-xs text-zinc-600 dark:text-zinc-400 flex-1 min-w-0">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Example Usage */}
        <div className="pt-4 border-t border-zinc-200 dark:border-[#333333]">
          <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider text-center mb-4">
            Example Usage
          </h4>
          <div className="bg-white dark:bg-[#0A0A0A] rounded-lg border border-zinc-200 dark:border-[#333333] overflow-hidden">
            <CodeBlock
              code={`<CodeBlock
  code="your code here"
  language="javascript"${props.map(prop => `\n  ${prop.name}={${prop.defaultValue || 'true'}}`).join('')}
  showLineNumbers
  enableLineHighlight
/>`}
              language="tsx"
              disableTopBar={true}
              showLineNumbers={false}
              className="text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
