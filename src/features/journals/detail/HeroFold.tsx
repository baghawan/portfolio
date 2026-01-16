import { Card, Text } from "@/components/ui";

export default function HeroFold() {
  return (
    <section>
      <div className='container-narrow mb-8 xl:mb-12'>
        <Text
          as='h1'
          variant='heading'
        >
          How to rewire your brain to be addicted to coding
        </Text>
      </div>

      <Card className='flex-1 aspect-video md:aspect-[21/7]'>
        <div className='p-6'>aaa</div>
      </Card>
    </section>
  );
}
