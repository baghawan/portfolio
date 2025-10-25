import { Anchor, Card, Text } from "@/components/ui";
import { WorkListProps } from "@/types";
import Image from "next/image";

export default function WorkList({ data }: { data: WorkListProps[] }) {
  return (
    <>
      <section className='pb-16 container-fluid grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3'>
        {data.map(({ documentId, title, expertise, slug, gallery }) => {
          const imageSource = gallery.formats?.medium;

          return (
            <Anchor
              key={documentId}
              className='flex gap-3 flex-col items-start'
              href={`/works/${slug}`}
              variant='muted'
            >
              <div className='py-2 border-t border-solid border-t-neutral-200 dark:border-t-neutral-700 w-full'>
                <Text
                  variant='body'
                  as='h2'
                >
                  {title}
                </Text>
                <Text
                  variant='caption'
                  className='text-neutral-400 dark:text-neutral-500'
                >
                  {expertise.name}
                </Text>
              </div>
              <Card className='aspect-square rounded-2xl'>
                <Image
                  src={`${process.env.STRAPI_ASSETS_BASE_URL}${imageSource?.url}`}
                  alt={title}
                  width={imageSource?.width}
                  height={imageSource?.height}
                />
              </Card>
            </Anchor>
          );
        })}
      </section>
    </>
  );
}
