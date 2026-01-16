/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  BlocksContent,
  BlockNode,
  InlineNode,
  TextNode,
  LinkNode,
  ParagraphBlock,
  HeadingBlock,
  ListBlock,
  QuoteBlock,
  CodeBlock,
  ImageBlock,
} from "@/types";

/* ---------- utils ---------- */

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/* ---------- inline renderers ---------- */

const inlineRenderers: Record<InlineNode["type"], (node: any) => string> = {
  text: (node: TextNode) => {
    let out = escapeHtml(node.text);

    if (node.code) out = `<code>${out}</code>`;
    if (node.bold) out = `<strong>${out}</strong>`;
    if (node.italic) out = `<em>${out}</em>`;
    if (node.underline) out = `<u>${out}</u>`;
    if (node.strikethrough) out = `<s>${out}</s>`;

    return out;
  },

  link: (node: LinkNode) => {
    const children = node.children.map(renderInline).join("");
    return `<a href="${escapeHtml(
      node.url
    )}" target="_blank" rel="noopener noreferrer">${children}</a>`;
  },
};

function renderInline(node: InlineNode): string {
  return inlineRenderers[node.type]?.(node) ?? "";
}

/* ---------- block renderers ---------- */

const blockRenderers: Record<BlockNode["type"], (block: any) => string> = {
  paragraph: (block: ParagraphBlock) =>
    `<p>${block.children.map(renderInline).join("")}</p>`,

  heading: (block: HeadingBlock) => {
    const level = Math.min(Math.max(block.level, 1), 6);
    return `<h${level}>${block.children
      .map(renderInline)
      .join("")}</h${level}>`;
  },

  list: (block: ListBlock) => {
    const tag = block.format === "ordered" ? "ol" : "ul";
    const items = block.children
      .map((item) => `<li>${item.children.map(renderInline).join("")}</li>`)
      .join("");
    return `<${tag}>${items}</${tag}>`;
  },

  quote: (block: QuoteBlock) =>
    `<blockquote>${block.children.map(renderInline).join("")}</blockquote>`,

  code: (block: CodeBlock) =>
    `<pre><code>${escapeHtml(
      block.children.map((n) => n.text).join("")
    )}</code></pre>`,

  image: (block: ImageBlock) => {
    const alt = escapeHtml(block.image.alternativeText ?? "");
    const caption = block.image.caption
      ? `<figcaption>${escapeHtml(block.image.caption)}</figcaption>`
      : "";

    return `<figure>
      <img src="${escapeHtml(block.image.url)}" alt="${alt}" />
      ${caption}
    </figure>`;
  },
};

export function BlocksRenderer(content: BlocksContent): string {
  return content
    .map((block) => blockRenderers[block.type]?.(block) ?? "")
    .join("");
}
