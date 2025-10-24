import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-bash';
interface Props {
    code: string;
    language?: 'javascript' | 'typescript' | 'python' | 'html' | 'css' | 'json' | 'markdown' | 'bash' | 'plaintext';
    showLineNumbers?: boolean;
    title?: string;
    copyable?: boolean;
    maxHeight?: string;
    theme?: 'dark' | 'light';
}
declare const CodeBlock: import("svelte").Component<Props, {}, "">;
type CodeBlock = ReturnType<typeof CodeBlock>;
export default CodeBlock;
