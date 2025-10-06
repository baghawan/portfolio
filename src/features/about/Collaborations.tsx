import { Text } from "@/components/ui";

const ITEMS = 8;

export default function Collaborations() {
  const renderPlaceholderCards = () => {
    return Array.from(Array(ITEMS).keys()).map((_, i) => (
      <div
        key={i}
        className='p-6 flex-1/2 md:flex-1/4 xl:flex-1/6 aspect-square !grow-0 flex items-center justify-center border-r border-b border-dashed border-r-neutral-200 border-b-neutral-200 dark:border-r-neutral-700 dark:border-b-neutral-700'
      >
        asassaasas {i}
      </div>
    ));
  };

  return (
    <section className='container-fluid mb-16'>
      <Text
        variant='heading'
        as='h2'
        className='mb-6'
      >
        Collaborations
      </Text>

      <div className='flex flex-wrap border-l border-t border-dashed border-l-neutral-200 border-t-neutral-200 dark:border-l-neutral-700 dark:border-t-neutral-700'>
        {renderPlaceholderCards()}
      </div>
    </section>
  );
}
