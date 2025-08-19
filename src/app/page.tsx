import { Text } from "@/components/ui";

export default function Home() {
  return (
    <section className='container-fluid h-[1000px]'>
      <Text
        variant='display'
        as='h1'
        className='mb-6'
      >
        Dian Baghawan Putera
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
      <Text>Whereas recognition of the inherent dignity</Text>
    </section>
  );
}
