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

interface AboutData {
  intro?: BlocksContent;
  expertise?: TExpertise[];
  experiences?: TExperiences[];
  collaborations?: TCollaborations[];
}

export default async function About() {
  const { data } = await fetcher<AboutData>({ endpoint: "/about" });
  const { intro, expertise, experiences, collaborations } = data || {};

  return (
    <>
      {!!intro && <Intro data={intro} />}
      {!!expertise && <Expertise data={expertise} />}
      {!!experiences && <Experiences data={experiences} />}
      {!!collaborations && <Collaborations data={collaborations} />}
    </>
  );
}
