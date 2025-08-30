import { FeaturedJournals, FeaturedWorks, Intro } from "@/features/home";
import { mockHome } from "@/features/home/mock";

export default function Home() {
  const {
    intro: { title, description },
  } = mockHome;

  return (
    <>
      <Intro
        title={title}
        description={description}
      />
      <FeaturedWorks />
      <FeaturedJournals />
    </>
  );
}
