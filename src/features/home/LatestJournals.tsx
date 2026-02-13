import Anchor from "@/components/ui/Anchor";
import Card from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Slider } from "@/components/common/Slider";
import { JournalListProps } from "@/types/journals";
import Image from "next/image";

interface LatestJournalsProps {
  journals: JournalListProps[];
}

export default function LatestJournals({ journals }: LatestJournalsProps) {
  return (
    <section className='mb-16'>
      <div className='container-fluid flex items-center justify-between mb-6'>
        <Text
          variant='heading'
          as='h2'
        >
          Latest Journals
        </Text>
        <Anchor
          href='/journals'
          variant='muted'
        >
          <span>See All</span>
          <ArrowRightIcon
            width={18}
            height={18}
            aria-hidden
          />
        </Anchor>
      </div>
      <Slider
        className='py-2 px-5 overflow-hidden'
        options={{
          align: "center",
          loop: true,
          skipSnaps: true,
        }}
      >
        {journals.map((journal: JournalListProps) => (
          <div
            key={journal.id}
            className='flex-[0_0_80%] md:flex-[0_0_30%] px-2'
          >
            <Card className='aspect-[7/8] rounded-2xl overflow-hidden relative'>
              <Image
                src={`${process.env.STRAPI_ASSETS_BASE_URL}${journal.cover_picture.formats?.medium?.url ?? journal.cover_picture.url}`}
                alt={journal.cover_picture.alternativeText ?? journal.title}
                fill
                sizes='(max-width: 768px) 80vw, 30vw'
                className='object-cover'
              />
              <div className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 from-10% to-transparent to-90% pt-24'>
                <Text
                  as='h3'
                  variant='subheading'
                  className='text-white line-clamp-2 mb-2'
                >
                  {journal.title}
                </Text>
                <Text
                  variant='caption'
                  className='text-white/80'
                >
                  {journal.journal_category?.name}
                </Text>
              </div>
            </Card>
          </div>
        ))}
      </Slider>
    </section>
  );
}
