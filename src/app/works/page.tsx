import type { Metadata } from "next";
import { fetcher } from "@/lib/fetcher";
import Text from "@/components/ui/Text";
import { WORKS_SEO } from "@/constants/seo";
import WorkList from "@/features/works/list/WorkList";
import { WorkListProps } from "@/types/works";

export const metadata: Metadata = WORKS_SEO;

export default async function Work() {
  const { data } = await fetcher<WorkListProps[]>({ endpoint: "/works" });

  return (
    <>
      <section className='container-fluid pt-8 xl:pt-12'>
        <Text
          as='h1'
          variant='display'
        >
          Works
        </Text>
      </section>
      <WorkList data={data} />
    </>
  );
}
