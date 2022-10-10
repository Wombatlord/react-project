import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from 'rehype-raw';

export function RenderedMarkdown({ Markdown }) {
  return (
    <ReactMarkdown
      rehypePlugins={[remarkGfm, rehypeHighlight, rehypeRaw]}
    >{Markdown ? Markdown : "# Nothing to display"}</ReactMarkdown>
  );
}
