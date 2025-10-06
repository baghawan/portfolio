"use client";

import { usePathname } from "next/navigation";
import { Anchor } from "../ui";
import { ThemeToggle } from "./ThemeToggle";
import { MAIN_NAVIGATION_ITEMS } from "@/constants";
import { cn } from "@/utils/cn";
import { isActivePath } from "@/utils/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='py-1 px-5 fixed top-3 left-1/2 -translate-x-1/2 lg:top-4 z-10 flex items-center justify-between lg:justify-evenly gap-2 w-full max-w-[95dvw] md:max-w-[400px] mx-auto border border-solid bg-[var(--background)]/60 border-neutral-200 dark:border-neutral-700 rounded-full backdrop-blur-sm'>
      <Anchor
        href='/'
        variant='muted'
        className='font-black text-xl'
      >
        B
      </Anchor>
      <nav>
        <ul className='flex gap-1 items-center'>
          {MAIN_NAVIGATION_ITEMS.map((item, index) => (
            <li key={index}>
              <Anchor
                href={item.href}
                variant='muted'
                className={cn(
                  "px-4 md:px-5 py-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-medium relative",
                  isActivePath(pathname, item.href) &&
                    "after:absolute after:left-1/2 after:-translate-x-1/2 after:border-3 after:border-solid after:border-[var(--background)] after:-bottom-[12px] after:h-3.5 after:w-3.5 after:rounded-full after:bg-neutral-700 dark:after:bg-neutral-200 after:content-['']"
                )}
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
