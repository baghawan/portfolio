import { Anchor, Card, Text } from "@/components/ui";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Slider } from "@/components/common/Slider";

const SLIDES = 6;

export default function LatestJournals() {
  const renderPlaceholderCards = () => {
    return Array.from(Array(SLIDES).keys()).map((_, i) => (
      <div
        key={i}
        className='flex-[0_0_80%] md:flex-[0_0_30%] px-2'
      >
        <Card className='aspect-[7/8] rounded-2xl'>
          <div className='p-6'>{i}</div>
        </Card>
      </div>
    ));
  };

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
          href='/journal'
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
        {renderPlaceholderCards()}
      </Slider>
    </section>
  );
}
