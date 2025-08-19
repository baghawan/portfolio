import { getCurrentYear } from "@/libs/date";
import { Text } from "@/components/ui";

export default function Footer() {
  return (
    <footer className='border-t border-t-neutral-200 dark:border-t-neutral-700'>
      <section className='container-fluid py-8'>
        <div>
          <Text
            variant='subheading'
            as='h3'
            className='text-neutral-500'
          >
            Let&apos;s work together
          </Text>
        </div>
        <div className='mt-8'>
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
