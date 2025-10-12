import { Card, Text } from "@/components/ui";

const ITEMS = 12;

export default function WorkList() {
  return (
    <section className='pb-16 container-fluid grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3'>
      {Array.from(Array(ITEMS).keys()).map((_, i) => (
        <div
          key={i}
          className='flex gap-4 flex-col'
        >
          <div className='py-2 border-t border-solid border-t-neutral-200 dark:border-t-neutral-700'>
            <Text
              variant='body'
              as='h2'
            >
              asdasd asdasdsa {i}
            </Text>
            <Text
              variant='caption'
              className='text-neutral-400 dark:text-neutral-500'
            >
              asdasd {i + 1}
            </Text>
          </div>
          <Card className='aspect-square rounded-2xl'>
            <div className='p-6'>{i}</div>
          </Card>
        </div>
      ))}
    </section>
  );
}
