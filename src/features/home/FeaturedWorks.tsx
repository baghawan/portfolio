import { Text } from "@/components/ui";

export default function FeaturedWorks() {
  return (
    <section className='bg-neutral-100 dark:bg-neutral-900'>
      <div className='container-fluid py-16 h-[300px]'>
        <Text
          variant='heading'
          as='h2'
          className='mb-6'
        >
          Featured Works
        </Text>
      </div>
    </section>
  );
}
