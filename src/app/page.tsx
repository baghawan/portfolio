import MorphedShapes from "@/components/common/MorphedShapes";
import { Text } from "@/components/ui";
import {
  LatestJournals,
  FeaturedWorks,
  Intro,
  MarqueeBlock,
} from "@/features/home";
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
      <section className='py-2 md:py-8'>
        <MarqueeBlock>
          <Text
            as='span'
            variant='display'
            className='px-4 lg:px-6 italic'
          >
            Dian Baghawan Putera
          </Text>
          <MorphedShapes className='pl-4 pr-2' />
        </MarqueeBlock>
      </section>
      <LatestJournals />
    </>
  );
}
