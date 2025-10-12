import { Text } from "@/components/ui";

export default function WorkDetails() {
  return (
    <section className='xl:-mt-20'>
      <div className='flex flex-col xl:flex-row *:xl:flex-1/2'>
        <div className='p-5 xl:border-l xl:border-solid xl:border-l-neutral-200 xl:dark:border-l-neutral-700 xl:order-2 xl:py-20'>
          <div className='xl:sticky xl:top-24'>
            <Text
              as='h1'
              variant='heading'
            >
              Work Details
            </Text>
          </div>
        </div>
        <div className='bg-neutral-50 h-[1500px] xl:order-1'></div>
      </div>
    </section>
  );
}
