import { Card, Text } from "@/components/ui";
import { cn } from "@/utils/cn";

const ITEMS = 4;

const getClassName = (i: number) => {
  if (i === 0 || i === 3)
    return "flex-[0_0_100%] md:flex-[0_0_calc(66.6667%-8px)]";
  if (i === 1 || i === 2)
    return "flex-[0_0_100%] md:flex-[0_0_calc(33.3334%-8px)]";
  return "";
};

export default function FeaturedWorks() {
  const renderPlaceholderCards = () => {
    return Array.from(Array(ITEMS).keys()).map((_, i) => (
      <Card
        className={cn(
          "h-[250px] lg:h-[340px] xl:h-[500px] rounded-2xl",
          getClassName(i)
        )}
        key={i}
      >
        <div className='p-6'>{i}</div>
      </Card>
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
          Featured Works
        </Text>
      </div>
      <div className='container-fluid flex gap-4 flex-wrap'>
        {renderPlaceholderCards()}
      </div>
    </section>
  );
}
