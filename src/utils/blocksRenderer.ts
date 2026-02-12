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
} from "@/types/strapi-blocks";

import { codeToHtml } from "shiki";

/* ---------- shiki ---------- */

async function renderCodeBlock(text: string, lang = "js"): Promise<string> {
  return codeToHtml(text, {
    lang,
    theme: "dark-plus",
  });
}

/* ---------- utils ---------- */

const escapeHtml = (str: string): string =>
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

    if (node.code)
      out = `<code class="bg-neutral-100 dark:bg-neutral-800 py-1 px-1.5 rounded-sm">${out}</code>`;
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
  return inlineRenderers[node.type](node);
}

/* ---------- block renderers ---------- */

const blockRenderers: Record<
  BlockNode["type"],
  (block: any) => Promise<string>
> = {
  paragraph: async (block: ParagraphBlock) =>
    `<p>${block.children.map(renderInline).join("")}</p>`,

  heading: async (block: HeadingBlock) => {
    const level = Math.min(Math.max(block.level, 1), 6);
    return `<h${level}>${block.children
      .map(renderInline)
      .join("")}</h${level}>`;
  },

  list: async (block: ListBlock) => {
    const isOrdered = block.format === "ordered";
    const tag = isOrdered ? "ol" : "ul";
    const className = isOrdered ? "list-decimal" : "list-disc";

    const items = block.children
      .map((item) => `<li>${item.children.map(renderInline).join("")}</li>`)
      .join("");

    return `<${tag} class="${className} pl-4">${items}</${tag}>`;
  },

  quote: async (block: QuoteBlock) =>
    `<blockquote class="relative border-l-4 border-zinc-600 pl-3 italic">${block.children
      .map(renderInline)
      .join("")}</blockquote>`,

  code: async (block: CodeBlock) => {
    const raw = block.children.map((n) => n.text).join("");
    const language = block.language ?? "plaintext";

    return renderCodeBlock(raw, language);
  },

  image: async (block: ImageBlock) => {
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

/* ---------- public API ---------- */

export async function renderBlocks(content: BlocksContent): Promise<string> {
  const parts = await Promise.all(
    content.map((block) => blockRenderers[block.type](block))
  );

  return parts.join("");
}
