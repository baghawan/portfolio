import type { Metadata } from "next";
import { Text } from "@/components/ui";
import { WORKS_SEO } from "@/constants";
import { WorkList } from "@/features/works/list";
import { fetcher } from "@/lib/fetcher";
import { WorkListProps } from "@/types";

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
