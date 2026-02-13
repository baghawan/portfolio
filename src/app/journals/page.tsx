import type { Metadata } from "next";
import Text from "@/components/ui/Text";
import { JOURNALS_SEO } from "@/constants/seo";
import JournalList from "@/features/journals/list/JournalList";
import { getJournals } from "@/features/journals/actions";

export const metadata: Metadata = JOURNALS_SEO;

export default async function Journal() {
  const { data } = await getJournals({ pageSize: 8 });

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
      <JournalList data={data} />
    </>
  );
}
