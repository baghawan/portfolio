import type { HomeIntro } from "./models";
import { Text } from "@/components/ui";

export default function Intro({ title, description }: HomeIntro) {
  return (
    <section className='container-fluid'>
      <div className='w-full max-w-[700px] lg:max-w-[960px]'>
        <Text
          variant='display'
          as='h1'
          className='mb-6 md:mb-8'
        >
          {title}
        </Text>
        <Text
          variant='subheading'
          className='text-neutral-400'
        >
          {description}
        </Text>
      </div>
    </section>
  );
}
