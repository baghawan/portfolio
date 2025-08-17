import { Anchor } from "@/components/ui/Anchor";
import { ThemeToggle } from "./ThemeToggle";

type NavigationItem = {
  label: string;
  href: string;
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "About",
    href: "/",
  },
  {
    label: "Works",
    href: "/",
  },
  {
    label: "Journal",
    href: "/",
  },
];

export default function Header() {
  return (
    <header className='py-6 mb-8 sticky top-0 flex items-center justify-between gap-4 container-fluid'>
      <Anchor
        href='/'
        variant='muted'
        className='font-black text-3xl'
      >
        B
      </Anchor>
      <nav className=' p-1.5 w-fit mx-auto border border-solid border-gray-200 dark:border-gray-600 rounded-full bg-[var(--background)]/65 z-10 backdrop-blur-md'>
        <ul className='flex gap-2 items-center'>
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.label}>
              <Anchor
                href={item.href}
                variant='muted'
                className='px-6 py-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-100 font-medium'
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
