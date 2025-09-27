import MorphedShapes from "@/components/common/MorphedShapes";
import { Text } from "@/components/ui";
import {
  LatestJournals,
  FeaturedWorks,
  Intro,
  MarqueeBlock,
  Expertise,
} from "@/features/home";
import { mockHome } from "@/features/home/mock";

export default function Home() {
  const {
    intro: { title, description },
  } = mockHome;

  return (
    <div className='flex flex-col gap-16 lg:gap-24'>
      <Intro
        title={title}
        description={description}
      />
      <FeaturedWorks />
      <Expertise />
      <LatestJournals />
      <section>
        <div className='border-t border-solid border-t-neutral-200 dark:border-t-neutral-700 py-1'>
          <MarqueeBlock>
            <Text
              as='span'
              variant='heading'
              className='px-4 lg:px-6 uppercase italic'
            >
              Dian Baghawan Putera
            </Text>
            <MorphedShapes className='pl-4 pr-2' />
          </MarqueeBlock>
        </div>
      </section>
    </div>
  );
}
