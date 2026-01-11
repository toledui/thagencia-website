"use client";

import parse, {
  HTMLReactParserOptions,
  Element,
  Text,
  domToReact,
} from "html-react-parser";
import Image from "next/image";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    // Handle text nodes directly
    if (domNode instanceof Text) {
      const text = domNode.data.trim();
      return text ? domNode.data : null;
    }

    if (domNode instanceof Element) {
      const { name, attribs, children } = domNode;

      // Handle images
      if (name === "img") {
        const { src, alt, width, height } = attribs;
        return (
          <div key={src} className="my-8 rounded-xl overflow-hidden">
            <img
              src={src}
              alt={alt || "Imagen del artículo"}
              className="w-full h-auto rounded-xl"
            />
          </div>
        );
      }

      // Handle paragraphs
      if (name === "p") {
        return (
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
            {domToReact(children, options)}
          </p>
        );
      }

      // Handle headings
      if (name === "h2") {
        return (
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mt-8 mb-4">
            {domToReact(children, options)}
          </h2>
        );
      }

      if (name === "h3") {
        return (
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mt-6 mb-3">
            {domToReact(children, options)}
          </h3>
        );
      }

      if (name === "h4") {
        return (
          <h4 className="text-lg font-bold text-neutral-900 dark:text-white mt-5 mb-2">
            {domToReact(children, options)}
          </h4>
        );
      }

      // Handle unordered lists
      if (name === "ul") {
        return (
          <ul className="list-disc list-inside mb-4 space-y-2 text-neutral-700 dark:text-neutral-300">
            {domToReact(children, options)}
          </ul>
        );
      }

      // Handle ordered lists
      if (name === "ol") {
        return (
          <ol className="list-decimal list-inside mb-4 space-y-2 text-neutral-700 dark:text-neutral-300">
            {domToReact(children, options)}
          </ol>
        );
      }

      // Handle list items
      if (name === "li") {
        return (
          <li className="text-neutral-700 dark:text-neutral-300">
            {domToReact(children, options)}
          </li>
        );
      }

      // Handle code blocks
      if (name === "pre") {
        return (
          <pre className="bg-neutral-900 dark:bg-neutral-950 text-neutral-100 p-4 rounded-lg overflow-x-auto mb-4 border border-neutral-800">
            {domToReact(children, options)}
          </pre>
        );
      }

      // Handle inline code
      if (name === "code") {
        // Check if parent is pre, then don't add inline styles
        const parent = domNode.parent;
        if (parent?.name === "pre") {
          return (
            <code className="text-sm font-mono">
              {domToReact(children, options)}
            </code>
          );
        }
        return (
          <code className="bg-orange-600/10 text-orange-600 dark:text-orange-400 px-2 py-1 rounded font-mono text-sm">
            {domToReact(children, options)}
          </code>
        );
      }

      // Handle blockquotes
      if (name === "blockquote") {
        return (
          <blockquote className="border-l-4 border-orange-600 pl-4 my-4 italic text-neutral-600 dark:text-neutral-400">
            {domToReact(children, options)}
          </blockquote>
        );
      }

      // Handle tables
      if (name === "table") {
        return (
          <div className="overflow-x-auto mb-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <table className="w-full text-sm">
              {domToReact(children, options)}
            </table>
          </div>
        );
      }

      if (name === "thead") {
        return (
          <thead className="bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
            {domToReact(children, options)}
          </thead>
        );
      }

      if (name === "tbody") {
        return (
          <tbody>
            {domToReact(children, options)}
          </tbody>
        );
      }

      if (name === "tr") {
        return (
          <tr className="border-b border-neutral-200 dark:border-neutral-800 last:border-b-0">
            {domToReact(children, options)}
          </tr>
        );
      }

      if (name === "th") {
        return (
          <th className="px-4 py-3 text-left font-bold text-neutral-900 dark:text-white whitespace-nowrap">
            {domToReact(children)}
          </th>
        );
      }

      if (name === "td") {
        return (
          <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
            {domToReact(children)}
          </td>
        );
      }

      // Handle links
      if (name === "a") {
        const { href } = attribs;
        return (
          <a
            href={href}
            className="text-orange-600 dark:text-orange-400 hover:underline font-semibold"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {domToReact(children, options)}
          </a>
        );
      }

      // Handle strong/bold
      if (name === "strong" || name === "b") {
        return (
          <strong className="!text-neutral-900 dark:!text-white !font-bold">
            {domToReact(children, options)}
          </strong>
        );
      }

      // Handle emphasis/italic
      if (name === "em" || name === "i") {
        return (
          <em className="italic text-neutral-700 dark:text-neutral-300">
            {domToReact(children, options)}
          </em>
        );
      }

      // Handle horizontal rule
      if (name === "hr") {
        return (
          <hr className="my-8 border-t border-neutral-200 dark:border-neutral-800" />
        );
      }

      // Handle columns/divs (common in WordPress for multi-column layouts)
      if (name === "div") {
        const { class: className } = attribs;
        
        // Detect column layouts
        if (className?.includes("wp-block-columns")) {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
              {domToReact(children, options)}
            </div>
          );
        }

        if (className?.includes("wp-block-column")) {
          return (
            <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
              {domToReact(children, options)}
            </div>
          );
        }

        // Default div handling
        if (children && children.length > 0) {
          return <div>{domToReact(children, options)}</div>;
        }
      }
    }
  },
};

interface BlogPostContentProps {
  content: string;
}

export function BlogPostContent({ content }: BlogPostContentProps) {
  if (!content) return null;

  return (
    <div className="max-w-none [&_strong]:text-neutral-900 dark:[&_strong]:text-white [&_strong]:font-bold [&_b]:text-neutral-900 dark:[&_b]:text-white [&_b]:font-bold">
      {parse(content, options)}
    </div>
  );
}
