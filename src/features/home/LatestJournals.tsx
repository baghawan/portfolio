import { Card, Text } from "@/components/ui";
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
    <section>
      <div className='container-fluid'>
        <Text
          variant='heading'
          as='h2'
          className='mb-6'
        >
          Featured Journals
        </Text>
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
