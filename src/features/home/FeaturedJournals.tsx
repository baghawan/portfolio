import { Text } from "@/components/ui";

export default function FeaturedJournals() {
  return (
    <section className='container-fluid'>
      <div className='w-full'>
        <Text
          variant='heading'
          as='h2'
          className='mb-6'
        >
          Featured Journals
        </Text>
      </div>
    </section>
  );
}
