import { Text } from "@/components/ui";
import { JournalList } from "@/features/journals";

export default function Journal() {
  return (
    <>
      <section className='container-fluid pt-8 xl:pt-12'>
        <Text
          as='h1'
          variant='display'
        >
          Journals
        </Text>
      </section>
      <JournalList />
    </>
  );
}
