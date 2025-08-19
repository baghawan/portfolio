import { NAVIGATION_ITEMS } from "@/constants";
import { Anchor } from "../ui";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className='py-2 px-4 mb-12 sticky top-3 lg:top-4 z-10 flex items-center justify-between lg:justify-evenly gap-2 w-[95dvw] lg:w-[500px] mx-auto border border-solid bg-[var(--background)]/60 border-neutral-200 dark:border-neutral-700 rounded-full backdrop-blur-sm'>
      <Anchor
        href='/'
        variant='muted'
        className='font-black text-3xl'
      >
        B
      </Anchor>
      <nav>
        <ul className='flex gap-1 items-center'>
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.label}>
              <Anchor
                href={item.href}
                variant='muted'
                className='px-4 md:px-6 py-2 rounded-full hover:bg-neutral-100 text-sm md:text-base font-medium'
              >
                {item.label}
              </Anchor>
            </li>
          ))}
        </ul>
      </nav>
      <ThemeToggle />
    </header>
  );
}
