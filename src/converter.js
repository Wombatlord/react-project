import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export function RenderedMarkdown({ Markdown }) {
  return (
    <ReactMarkdown
      children={Markdown ? Markdown : "# Nothing to display"}
      rehypePlugins={[remarkGfm, rehypeHighlight]}
    />
  );
}
