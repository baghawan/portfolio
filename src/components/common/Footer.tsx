import { getCurrentYear } from "@/utils/date";
import { Anchor, Text } from "@/components/ui";
import { EXTERNAL_NAVIGATION_ITEMS } from "@/constants";

export default function Footer() {
  return (
    <footer className='border-t border-t-neutral-200 dark:border-t-neutral-700 rounded-tl-2xl rounded-tr-2xl mt-16'>
      <section className='container-fluid py-8'>
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
            variant='muted'
            className='underline'
          >
            baghawan@protonmail.com
          </Anchor>
        </Text>
        <div className='mt-16 flex flex-col md:flex-row md:items-center gap-6 justify-between'>
          <Text
            variant='caption'
            className='text-neutral-500'
          >
            © {getCurrentYear()} Dian Baghawan Putera — Intersecting visual
            design and functional code since &apos;15.
          </Text>
          <ul className='inline-flex gap-4'>
            {EXTERNAL_NAVIGATION_ITEMS.map((item, index) => (
              <li key={index}>
                <Anchor
                  href={item.href}
                  variant='muted'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {item.label}
                </Anchor>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </footer>
  );
}
