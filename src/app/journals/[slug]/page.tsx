import type { Metadata } from "next";
import { fetcher } from "@/lib/fetcher";
import { Content, HeroFold } from "@/features/journals/detail";
import { notFound } from "next/navigation";
import { StrapiError } from "@/lib/error";
import { buildMetadata } from "@/utils/seo";
import { JournalData } from "@/types";

async function getWorkDataFromParams(
  params: Promise<{ slug: string }>
): Promise<JournalData> {
  const { slug } = await params;
  try {
    const { data } = await fetcher<JournalData>({
      endpoint: `/journals/${slug}`,
    });
    return data;
  } catch (err) {
    if (err instanceof StrapiError && err.status === 404) notFound();
    throw err;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const data = await getWorkDataFromParams(params);
  return buildMetadata(data.seo);
}

export default async function Journal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const data = await getWorkDataFromParams(params);
  const { title, cover_picture, content } = data;

  return (
    <article className='pt-8 xl:pt-12 flex flex-col gap-12'>
      <HeroFold
        title={title}
        cover_picture={cover_picture}
      />
      <Content content={content} />
    </article>
  );
}
