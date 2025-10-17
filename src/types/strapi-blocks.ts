/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface LinkNode {
  type: "link";
  url: string;
  children: TextNode[];
}

export type InlineNode = TextNode | LinkNode;

export interface ParagraphBlock {
  type: "paragraph";
  children: InlineNode[];
}

export interface HeadingBlock {
  type: "heading";
  level: number;
  children: InlineNode[];
}

export interface ListItemBlock {
  type: "list-item";
  children: InlineNode[];
}

export interface ListBlock {
  type: "list";
  format: "unordered" | "ordered";
  children: ListItemBlock[];
}

export interface QuoteBlock {
  type: "quote";
  children: InlineNode[];
}

export interface CodeBlock {
  type: "code";
  children: TextNode[];
}

export interface ImageBlock {
  type: "image";
  image: {
    url: string;
    alternativeText?: string | null;
    caption?: string | null;
    [key: string]: any;
  };
  children: TextNode[];
}

export type BlockNode =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | QuoteBlock
  | CodeBlock
  | ImageBlock;

export type BlocksContent = BlockNode[];
