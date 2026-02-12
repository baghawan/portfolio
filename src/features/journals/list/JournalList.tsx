import Card from "@/components/ui/Card";
import Text from "@/components/ui/Text";

const ITEMS = 12;

type ItemListProps = {
  index: number;
};

const BigItemList = ({ index }: ItemListProps) => {
  return (
    <div className='md:col-span-2'>
      <Card className='aspect-square md:aspect-video xl:aspect-auto h-full rounded-2xl'>
        <div className='p-6'>{index}</div>
      </Card>
    </div>
  );
};

const ItemList = ({ index }: ItemListProps) => {
  return (
    <div className='col-span-1 flex gap-4 md:flex-col'>
      <Card className='flex-1 aspect-square rounded-2xl md:flex-auto md:order-2'>
        <div className='p-6'>{index}</div>
      </Card>
      <div className='flex-2 py-2 border-t border-solid border-t-neutral-200 dark:border-t-neutral-700 md:flex-auto md:order-1'>
        <Text
          variant='body'
          as='h2'
        >
          asdasd asdasdsa {index}
        </Text>
        <Text
          variant='caption'
          className='text-neutral-400 dark:text-neutral-500'
        >
          asdasd {index + 1}
        </Text>
      </div>
    </div>
  );
};

export default function JournalList() {
  return (
    <section className='pb-16 container-fluid grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3'>
      {Array.from(Array(ITEMS).keys()).map((_, i) => {
        if (i > 0) {
          return (
            <ItemList
              key={i}
              index={i}
            />
          );
        }

        return (
          <BigItemList
            key={i}
            index={i}
          />
        );
      })}
    </section>
  );
}
