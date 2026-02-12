import type { Metadata } from "next";
import { fetcher } from "@/lib/fetcher";
import { WorksData } from "@/types/works";
import WorkDetail from "@/features/works/detail/WorkDetail";
import { notFound } from "next/navigation";
import { StrapiError } from "@/lib/error";
import { buildMetadata } from "@/utils/seo";

async function getWorkDataFromParams(
  params: Promise<{ slug: string }>
): Promise<WorksData> {
  const { slug } = await params;
  try {
    const { data } = await fetcher<WorksData>({ endpoint: `/works/${slug}` });
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

export default async function WorkDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const data = await getWorkDataFromParams(params);

  return <WorkDetail {...data} />;
}
