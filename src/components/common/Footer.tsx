import { getCurrentYear } from "@/libs/date";
import { Anchor, Text } from "@/components/ui";

export default function Footer() {
  return (
    <footer className='border-t border-t-neutral-200 dark:border-t-neutral-700'>
      <section className='container-fluid py-8'>
        <div>
          <Text
            variant='subheading'
            as='h3'
            className='text-neutral-500 mb-2'
          >
            Let&apos;s work together
          </Text>
          <Text variant='heading'>
            <Anchor
              href='mailto:baghawan@protonmail.com'
              className='text-black dark:text-white'
            >
              baghawan@protonmail.com
            </Anchor>
          </Text>
        </div>
        <div className='mt-16'>
          <Text
            variant='caption'
            className='text-neutral-500'
          >
            © {getCurrentYear()} Dian Baghawan Putera — Intersecting visual
            design and functional code since &apos;15.
          </Text>
        </div>
      </section>
    </footer>
  );
}
