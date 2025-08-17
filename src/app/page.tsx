import { Text } from "@/components/ui/Text";

export default function Home() {
  return (
    <section className='container-fluid h-[3000px]'>
      <Text
        variant='display'
        as='h1'
        className='mb-6'
      >
        Whereas recognition of the inherent dignity
      </Text>
      <Text variant='subheading'>
        Hey, I’m Victor, an Independent Product Designer delivering top-tier
        Websites, SaaS, Mobile experiences, and good vibes for almost two
        decades.
      </Text>
      <br />
      <br />
      <Text
        variant='heading'
        className='mb-2'
      >
        Whereas recognition of the inherent dignity
      </Text>

      <Text
        variant='subheading'
        as='h3'
        className='mb-4'
      >
        Whereas recognition of the inherent dignity
      </Text>
    </section>
  );
}
