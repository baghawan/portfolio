import Text from "@/components/ui/Text";
import JournalList from "@/features/journals/list/JournalList";

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
