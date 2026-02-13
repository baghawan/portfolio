import Anchor from "@/components/ui/Anchor";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { JournalListProps } from "@/types/journals";

type JournalListComponentProps = {
  data: JournalListProps[];
};

const BigItemList = ({ item }: { item: JournalListProps }) => {
  const coverUrl =
    item.cover_picture.formats?.medium?.url ?? item.cover_picture.url;

  return (
    <Anchor
      href={`/journals/${item.slug}`}
      className='flex gap-2 xl:gap-3 flex-col items-start md:col-span-2'
      variant='muted'
    >
      <Card className='relative aspect-square md:aspect-video xl:aspect-auto w-full h-full rounded-2xl overflow-hidden'>
        {coverUrl && (
          <Image
            src={`${process.env.STRAPI_ASSETS_BASE_URL}${coverUrl}`}
            alt={item.title}
            width={item.cover_picture.formats?.medium?.width}
            height={item.cover_picture.formats?.medium?.height}
            className='w-full h-full object-cover'
          />
        )}
      </Card>
      <div className='py-2'>
        <Text
          variant='body'
          as='h2'
        >
          {item.title}
        </Text>
        <Text
          variant='caption'
          className='text-neutral-400 dark:text-neutral-500'
        >
          {item.journal_category.name}
        </Text>
      </div>
    </Anchor>
  );
};

const ItemList = ({ item }: { item: JournalListProps }) => {
  const coverUrl =
    item.cover_picture.formats?.small?.url ??
    item.cover_picture.formats?.thumbnail?.url ??
    item.cover_picture.url;

  return (
    <Anchor
      href={`/journals/${item.slug}`}
      className='col-span-1 flex gap-4 md:gap-3 md:flex-col items-start'
      variant='muted'
    >
      <Card className='flex-1 relative w-full aspect-square rounded-2xl md:flex-auto overflow-hidden'>
        {coverUrl && (
          <Image
            src={`${process.env.STRAPI_ASSETS_BASE_URL}${coverUrl}`}
            alt={item.title}
            fill
            className='object-cover'
          />
        )}
      </Card>
      <div className='flex-2 py-2 md:flex-auto'>
        <Text
          variant='body'
          as='h2'
        >
          {item.title}
        </Text>
        <Text
          variant='caption'
          className='text-neutral-400 dark:text-neutral-500'
        >
          {item.journal_category.name}
        </Text>
      </div>
    </Anchor>
  );
};

export default function JournalList({ data }: JournalListComponentProps) {
  if (!data || data.length === 0) {
    return (
      <section className='pb-16 container-fluid'>
        <Text variant='body'>No journals found.</Text>
      </section>
    );
  }

  return (
    <section className='pb-16 container-fluid grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3'>
      {data.map((item, i) => {
        if (i === 0) {
          return (
            <BigItemList
              key={item.documentId}
              item={item}
            />
          );
        }

        return (
          <ItemList
            key={item.documentId}
            item={item}
          />
        );
      })}
    </section>
  );
}
