import { Text } from "@/components/ui";
import { fetcher } from "@/lib/fetcher";
import { GalleryImage, SeoProps, WorkBase } from "@/types";

interface WorksData extends WorkBase {
  expertise: {
    id: string;
    documentId: string;
    name: string;
  };
  tools: {
    id: string;
    documentId: string;
    name: string;
  }[];
  gallery: GalleryImage[];
  seo: SeoProps;
}

interface Attributes {
  name: string;
  value: string | string[];
}

export default async function WorkDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await fetcher<WorksData>({ endpoint: `/works/${slug}` });
  const { title, description, year, expertise, tools, gallery } = data;

  const attributes: Attributes[] = [
    { name: "Year", value: year },
    { name: "Type", value: expertise.name },
    { name: "Tools", value: tools.map(({ name }) => name) },
  ];

  return (
    <section className='xl:-mt-20'>
      <div className='flex flex-col xl:flex-row *:xl:flex-1/2'>
        <div className='py-5 px-8 xl:border-l xl:border-solid xl:border-l-neutral-200 xl:dark:border-l-neutral-700 xl:order-2 xl:py-20'>
          <div className='xl:sticky xl:top-24'>
            <Text
              as='h1'
              variant='heading'
            >
              {title}
            </Text>
            <Text
              as='p'
              variant='body'
              className='mt-4 mb-8 text-neutral-400 dark:text-neutral-500'
            >
              {description}
            </Text>
            <ul>
              {attributes.map(({ name, value }) => (
                <li
                  key={name}
                  className='flex items-baseline py-2 border-b border-solid border-b-neutral-200 dark:border-b-neutral-700 *:flex-1/2'
                >
                  <Text
                    as='span'
                    variant='caption'
                  >
                    {name}
                  </Text>
                  <Text
                    as='span'
                    variant='caption'
                    className='text-neutral-400'
                  >
                    {value}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='bg-neutral-50 dark:bg-neutral-800 h-[1500px] xl:order-1'></div>
      </div>
    </section>
  );
}
