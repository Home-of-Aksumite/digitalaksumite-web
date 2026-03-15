/**
 * Blog Content Component
 * Renders Strapi blocks content with support for rich text, images, headings, lists, etc.
 */

'use client';

import { strapiApiUrl } from '@/config/env';

interface BlogContentProps {
  content: unknown;
}

// Strapi Block Types
interface TextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface LinkNode {
  type: 'link';
  url: string;
  children: (TextNode | LinkNode)[];
}

interface ParagraphBlock {
  type: 'paragraph';
  children: (TextNode | LinkNode)[];
}

interface HeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: TextNode[];
}

interface ListBlock {
  type: 'list';
  format: 'ordered' | 'unordered';
  children: {
    type: 'list-item';
    children: (TextNode | LinkNode)[];
  }[];
}

interface QuoteBlock {
  type: 'quote';
  children: (TextNode | LinkNode)[];
}

interface CodeBlock {
  type: 'code';
  children: TextNode[];
}

interface ImageBlock {
  type: 'image';
  image: {
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  };
}

type Block = ParagraphBlock | HeadingBlock | ListBlock | QuoteBlock | CodeBlock | ImageBlock;

// Render inline nodes (text with formatting and links)
function renderInlineNodes(nodes: (TextNode | LinkNode)[]): React.ReactNode {
  return nodes.map((node, index) => {
    if (node.type === 'link') {
      return (
        <a
          key={index}
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#C9A227] hover:underline"
        >
          {renderInlineNodes(node.children)}
        </a>
      );
    }

    // Text node with formatting
    let text: React.ReactNode = node.text;

    if (node.bold) {
      text = (
        <strong key={index} className="font-semibold text-gray-900 dark:text-gray-100">
          {text}
        </strong>
      );
    }
    if (node.italic) {
      text = (
        <em key={index} className="italic">
          {text}
        </em>
      );
    }
    if (node.underline) {
      text = <u key={index}>{text}</u>;
    }
    if (node.strikethrough) {
      text = <s key={index}>{text}</s>;
    }
    if (node.code) {
      text = (
        <code
          key={index}
          className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-[#C9A227] dark:bg-gray-800"
        >
          {text}
        </code>
      );
    }

    return <span key={index}>{text}</span>;
  });
}

// Render a single block
function renderBlock(block: Block, index: number): React.ReactNode {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={index} className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          {renderInlineNodes(block.children)}
        </p>
      );

    case 'heading': {
      const level = block.level;
      const classNameMap: Record<number, string> = {
        1: 'text-4xl font-bold mb-8 text-gray-900 dark:text-white',
        2: 'text-3xl font-bold mb-6 mt-10 text-gray-900 dark:text-white',
        3: 'text-2xl font-semibold mb-5 mt-8 text-gray-900 dark:text-white',
        4: 'text-xl font-semibold mb-4 mt-6 text-gray-900 dark:text-white',
        5: 'text-lg font-semibold mb-3 mt-5 text-gray-800 dark:text-gray-200',
        6: 'text-base font-semibold mb-3 mt-4 text-gray-800 dark:text-gray-200',
      };
      const className =
        // eslint-disable-next-line security/detect-object-injection
        classNameMap[level] ?? classNameMap[2];

      const headings: Record<number, React.ElementType> = {
        1: 'h1',
        2: 'h2',
        3: 'h3',
        4: 'h4',
        5: 'h5',
        6: 'h6',
      };
      const HeadingTag =
        // eslint-disable-next-line security/detect-object-injection
        headings[level] ?? 'h2';
      return (
        <HeadingTag key={index} className={className}>
          {renderInlineNodes(block.children)}
        </HeadingTag>
      );
    }

    case 'list': {
      const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
      const listClassName =
        block.format === 'ordered'
          ? 'list-decimal pl-6 mb-6 space-y-2'
          : 'list-disc pl-6 mb-6 space-y-2';

      return (
        <ListTag key={index} className={`${listClassName} text-gray-700 dark:text-gray-300`}>
          {block.children.map((item, itemIndex) => (
            <li key={itemIndex} className="pl-2 leading-relaxed">
              {renderInlineNodes(item.children)}
            </li>
          ))}
        </ListTag>
      );
    }

    case 'quote':
      return (
        <blockquote
          key={index}
          className="my-8 rounded-r-lg border-l-4 border-[#C9A227] bg-gradient-to-r from-[#C9A227]/5 to-transparent py-4 pr-4 pl-6"
        >
          <p className="text-lg leading-relaxed text-gray-700 italic dark:text-gray-300">
            {renderInlineNodes(block.children)}
          </p>
        </blockquote>
      );

    case 'code':
      return (
        <pre
          key={index}
          className="my-6 overflow-x-auto rounded-lg bg-gray-900 p-4 font-mono text-sm text-gray-100"
        >
          <code>{block.children.map((child) => child.text).join('')}</code>
        </pre>
      );

    case 'image': {
      const imageUrl = block.image.url.startsWith('http')
        ? block.image.url
        : `${strapiApiUrl}${block.image.url}`;

      return (
        <figure key={index} className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={block.image.alternativeText || ''}
            className="w-full rounded-xl shadow-lg"
            loading="lazy"
          />
          {block.image.alternativeText && (
            <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
              {block.image.alternativeText}
            </figcaption>
          )}
        </figure>
      );
    }

    default:
      return undefined;
  }
}

export function BlogContent({ content }: BlogContentProps) {
  if (!content || !Array.isArray(content)) {
    return undefined;
  }

  const blocks = content as Block[];

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      {blocks.map((block, index) => renderBlock(block, index))}
    </article>
  );
}
