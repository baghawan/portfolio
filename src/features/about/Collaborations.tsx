import { Text } from "@/components/ui";
import { TCollaborations } from "./types";
import Image from "next/image";

interface CollaborationsProps {
  data: TCollaborations[];
}

export default function Collaborations({ data }: CollaborationsProps) {
  const renderCards = () => {
    return data.map(({ documentId, name, logo }) => (
      <div
        key={documentId}
        className='p-6 flex-1/2 md:flex-1/4 xl:flex-1/6 aspect-square !grow-0 flex items-center justify-center border-r border-b border-dashed border-r-neutral-200 border-b-neutral-200 dark:border-r-neutral-700 dark:border-b-neutral-700'
      >
        <Image
          src={`${process.env.STRAPI_ASSETS_BASE_URL}${logo.url}`}
          alt={logo.alternativeText ?? name}
          title={name}
          width={logo.width / 4}
          height={logo.height / 4}
          className='dark:invert'
        />
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
        {renderCards()}
      </div>
    </section>
  );
}
