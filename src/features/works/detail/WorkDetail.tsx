import Image from "next/image";
import { Text } from "@/components/ui";
import { WorksData } from "@/types";

interface Attributes {
  name: string;
  value: string | string[];
}

export default function WorkDetail({
  title,
  description,
  year,
  expertise,
  tools,
  gallery,
}: WorksData) {
  const attributes: Attributes[] = [
    { name: "Year", value: year },
    { name: "Type", value: expertise.name },
    { name: "Tools", value: tools.map(({ name }) => name) },
  ];

  return (
    <section className='xl:-mt-20'>
      <div className='flex flex-col xl:flex-row *:xl:flex-1/2'>
        <div className='py-5 px-8 xl:border-l xl:border-solid xl:border-l-neutral-200 xl:dark:border-l-neutral-700 xl:order-2 xl:py-20'>
          <div className='sticky top-20 xl:top-24'>
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
                  className='flex items-baseline py-2 border-t border-solid border-t-neutral-200 dark:border-t-neutral-700 *:flex-1/2'
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
        <div className='relative bg-neutral-50 dark:bg-neutral-900 xl:order-1 p-4 flex flex-col gap-4 xl:gap-6 xl:p-8'>
          {gallery.map((img, i) => {
            return (
              <div
                key={img.id}
                className='relative aspect-square bg-(--background) rounded-xl overflow-hidden flex items-center'
              >
                <Image
                  src={`${process.env.STRAPI_ASSETS_BASE_URL}${img.url}`}
                  alt={img.alternativeText || title}
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                  width={img.width}
                  height={img.height}
                  sizes='(max-width: 768px) 100vw, 50vw'
                  className='object-contain'
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
