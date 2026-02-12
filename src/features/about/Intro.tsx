import Text from "@/components/ui/Text";
import { BlocksContent, TextNode } from "@/types/strapi-blocks";

export default function Intro({ data }: { data: BlocksContent }) {
  return (
    <section className='container-fluid min-h-[65dvh] md:min-h-[50dvh] xl:min-h-[75dvh] flex flex-col gap-8 lg:gap-12 justify-end-safe pb-6 xl:pb-12'>
      <div className='w-full max-w-[500px]'>
        <Text
          variant='display'
          as='h1'
        >
          Dian Baghawan Putera
        </Text>
      </div>
      <div className='flex flex-col xl:flex-row gap-6 justify-between'>
        <Text
          variant='subheading'
          className='text-neutral-500 dark:text-neutral-400 w-full xl:max-w-3/5'
        >
          {(data[0].children[0] as TextNode).text}
        </Text>
        <div className='flex gap-6 *:flex-1 w-full xl:max-w-1/3 lg:gap-10'>
          <Text className='text-neutral-500 dark:text-neutral-400 text-sm lg:text-base'>
            {(data[1].children[0] as TextNode).text}
          </Text>
          <Text className='text-neutral-500 dark:text-neutral-400 text-sm lg:text-base'>
            {(data[2].children[0] as TextNode).text}
          </Text>
        </div>
      </div>
    </section>
  );
}
