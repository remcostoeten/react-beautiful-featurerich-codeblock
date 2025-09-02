declare module 'react-syntax-highlighter' {
  import { ComponentType } from 'react';

  type THighlighterProps = {
    children?: string;
    language?: string;
    style?: Record<string, React.CSSProperties>;
    customStyle?: React.CSSProperties;
    codeTagProps?: Record<string, any>;
    useInlineStyles?: boolean;
    showLineNumbers?: boolean;
    showInlineLineNumbers?: boolean;
    startingLineNumber?: number;
    lineNumberContainerStyle?: React.CSSProperties;
    lineNumberStyle?: React.CSSProperties;
    wrapLines?: boolean;
    wrapLongLines?: boolean;
    lineProps?: Record<string, any> | ((lineNumber: number) => Record<string, any>);
    renderer?: ComponentType<any>;
    PreTag?: string | ComponentType<any>;
    CodeTag?: string | ComponentType<any>;
    [key: string]: any;
  };

  export const Prism: ComponentType<THighlighterProps>;
  export const PrismAsyncLight: ComponentType<THighlighterProps>;
  export const PrismLight: ComponentType<THighlighterProps>;
  export const Light: ComponentType<THighlighterProps>;
  export const LightAsync: ComponentType<THighlighterProps>;

  export default Prism;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  const styles: Record<string, Record<string, React.CSSProperties>>;
  export = styles;
}

declare module 'react-syntax-highlighter/dist/esm/styles/hljs' {
  const styles: Record<string, Record<string, React.CSSProperties>>;
  export = styles;
}

declare module 'react-syntax-highlighter/dist/esm/languages/prism/*' {
  const language: any;
  export default language;
}

declare module 'react-syntax-highlighter/dist/esm/languages/hljs/*' {
  const language: any;
  export default language;
}
