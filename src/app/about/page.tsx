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
import { SeoProps } from "@/types";
import { buildMetadata } from "@/utils/seo";

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
  return buildMetadata(data.seo);
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
