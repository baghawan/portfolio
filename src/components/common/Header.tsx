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
          {MAIN_NAVIGATION_ITEMS.map((item, index) => (
            <li key={index}>
              <Anchor
                href={item.href}
                variant='muted'
                className={cn(
                  "px-4 md:px-6 py-2 rounded-full hover:bg-neutral-100 text-sm md:text-base font-medium relative",
                  isActivePath(pathname, item.href) &&
                    "after:absolute after:left-1/2 after:-translate-x-1/2 after:border-3 after:border-solid after:border-[var(--background)] after:-bottom-[17px] after:md:-bottom-[15px] after:h-3.5 after:w-3.5 after:rounded-full after:bg-yellow-400 after:content-['']"
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
