"use server";

import { fetcher } from "@/lib/fetcher";
import { JournalListProps } from "@/types/journals";

interface GetJournalsOptions {
  pageSize?: number;
  sort?: string;
}

export async function getJournals(opts: GetJournalsOptions = {}) {
  const { pageSize = 10, sort = "createdAt:desc" } = opts;

  const { data, meta } = await fetcher<JournalListProps[]>({
    endpoint: "/journals",
    query: {
      "pagination[pageSize]": pageSize,
      sort,
    },
  });

  return { data, meta };
}
