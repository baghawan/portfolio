import type { Metadata } from "next";
import { fetcher } from "@/lib/fetcher";
import { BlocksContent } from "@/types/strapi-blocks";
import {
  Intro,
  Expertise,
  Collaborations,
  Experiences,
} from "@/features/about";
import {
  TCollaborations,
  TExperiences,
  TExpertise,
} from "@/features/about/types";
import { DEFAULT_SEO } from "@/constants";
import { SeoProps } from "@/types";

interface AboutData {
  intro?: BlocksContent;
  expertise?: TExpertise[];
  experiences?: TExperiences[];
  collaborations?: TCollaborations[];
  seo?: SeoProps;
}

async function getAboutData(): Promise<AboutData> {
  const { data } = await fetcher<AboutData>({ endpoint: "/about" });
  return data || {};
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutData();
  const seo = data.seo || {};

  const title = seo.metaTitle || String(DEFAULT_SEO.title);
  const description = seo.metaDescription || String(DEFAULT_SEO.description);
  const imageUrl = seo.metaImage?.url
    ? `${process.env.STRAPI_ASSETS_BASE_URL}${seo.metaImage.url}`
    : "";

  return {
    title,
    description,
    keywords: seo.keywords,
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

export default async function About() {
  const { intro, expertise, experiences, collaborations } =
    await getAboutData();

  return (
    <>
      {!!intro && <Intro data={intro} />}
      {!!expertise && <Expertise data={expertise} />}
      {!!experiences && <Experiences data={experiences} />}
      {!!collaborations && <Collaborations data={collaborations} />}
    </>
  );
}
