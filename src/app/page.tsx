import MorphedShapes from "@/components/common/MorphedShapes";
import { Text } from "@/components/ui";
import {
  LatestJournals,
  FeaturedWorks,
  Intro,
  MarqueeBlock,
} from "@/features/home";
import { mockHome } from "@/features/home/mock";
import { Fragment } from "react";

export default function Home() {
  const {
    intro: { title, description },
    expertise,
  } = mockHome;

  return (
    <>
      <Intro
        title={title}
        description={description}
      />
      <FeaturedWorks />
      <section>
        <div className='border-y border-solid border-y-neutral-200 dark:border-y-neutral-700 py-1'>
          <MarqueeBlock>
            {expertise.map((item, index) => (
              <Fragment key={index}>
                <Text
                  key={index}
                  as='span'
                  variant='display'
                  className='px-4 lg:px-6 uppercase italic'
                >
                  {item}
                </Text>
                <MorphedShapes className='pl-4 pr-2' />
              </Fragment>
            ))}
          </MarqueeBlock>
        </div>
        <div className='border-y border-solid border-y-neutral-200 dark:border-y-neutral-700 py-1'>
          <MarqueeBlock reverse>
            <Text
              as='span'
              variant='display'
              className='px-4 lg:px-6 uppercase italic'
            >
              Dian Baghawan Putera
            </Text>
            <MorphedShapes className='pl-4 pr-2' />
          </MarqueeBlock>
        </div>
      </section>
      <LatestJournals />
    </>
  );
}
