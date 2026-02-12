import { BlocksContent } from "@/types/strapi-blocks";
import { renderBlocks } from "@/utils/blocksRenderer";

export default async function Content({ content }: { content: BlocksContent }) {
  const html = await renderBlocks(content);

  return (
    <section className='container-narrow mb-24'>
      <article
        dangerouslySetInnerHTML={{ __html: html }}
        className='flex flex-col gap-4'
      />
    </section>
  );
}
