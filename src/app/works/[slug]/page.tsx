import { Text } from "@/components/ui";

export default function WorkDetails() {
  return (
    <section className='xl:-mt-20'>
      <div className='flex xl:border-t xl:border-solid xl:border-t-neutral-200 xl:dark:border-t-neutral-700 flex-col xl:flex-row *:xl:flex-1/2'>
        <div className='p-5 xl:border-l xl:border-solid xl:border-l-neutral-200 xl:dark:border-l-neutral-700 xl:order-2'>
          <Text
            as='h1'
            variant='heading'
          >
            Work Details
          </Text>
        </div>
        <div className='bg-neutral-50 h-[1500px] xl:order-1'></div>
      </div>
    </section>
  );
}
