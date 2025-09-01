export type TCodeBlockProps = {
  code: string;
  fileName?: string;
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
};

export type TIconProps = {
  className?: string;
  size?: number;
};
