import type { Metadata } from "next";
import { fetcher } from "@/lib/fetcher";
import { BlocksContent } from "@/types/strapi-blocks";
import Intro from "@/features/about/Intro";
import Expertise from "@/features/about/Expertise";
import Collaborations from "@/features/about/Collaborations";
import Experiences from "@/features/about/Experiences";
import { SeoProps } from "@/types/seo";
import { buildMetadata } from "@/utils/seo";
import {
  TExpertise,
  TExperiences,
  TCollaborations,
} from "@/features/about/types";

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
