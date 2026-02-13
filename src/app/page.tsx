import MorphedShapes from "@/components/common/MorphedShapes";
import Text from "@/components/ui/Text";
import Intro from "@/features/home/Intro";
import FeaturedWorks from "@/features/home/FeaturedWorks";
import LatestJournals from "@/features/home/LatestJournals";
import MarqueeBlock from "@/features/home/MarqueeBlock";
import { mockHome } from "@/features/home/mock";
import { getJournals } from "@/features/journals/actions";
import { Fragment } from "react";

export default async function Home() {
  const {
    intro: { title, description },
    expertise,
  } = mockHome;

  const { data: journals } = await getJournals({ pageSize: 4 });

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
            {expertise.map((item: string, index: number) => (
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
      <LatestJournals journals={journals ?? []} />
    </>
  );
}
