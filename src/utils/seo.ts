import { DEFAULT_SEO } from "@/constants/seo";
import { SeoProps } from "@/types/seo";
import type { Metadata } from "next";

export function buildMetadata(seo?: SeoProps): Metadata {
  const title = seo?.metaTitle || String(DEFAULT_SEO.title);
  const description = seo?.metaDescription || String(DEFAULT_SEO.description);
  const imageUrl = seo?.metaImage?.url
    ? `${process.env.STRAPI_ASSETS_BASE_URL}${seo.metaImage.url}`
    : "";

  return {
    title,
    description,
    keywords: seo?.keywords,
    openGraph: {
      title,
      description,
      images: imageUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl,
    },
  };
}
