"use client";

import * as m from "motion/react-m";
import { Text } from "@/components/ui";
import { useEntranceMotion } from "@/hooks";

export default function Intro() {
  const { initial, animate, transition } = useEntranceMotion();

  return (
    <section className='container-fluid min-h-[65dvh] md:min-h-[60dvh] xl:min-h-[70dvh] flex flex-col gap-8 md:gap-12 justify-end-safe pb-6 xl:pb-12'>
      <div className='w-full max-w-[500px]'>
        <Text
          variant='display'
          as='h1'
        >
          Dian Baghawan Putera
        </Text>
      </div>
      <div className='flex flex-col xl:flex-row gap-6 justify-between'>
        <Text
          variant='subheading'
          className='text-neutral-500 dark:text-neutral-400 w-full xl:max-w-1/2'
        >
          I craft pixel-aware, production-ready interfaces where visual design
          meets functional code. Favoring scalable, modular, and performant
          solutions. I translate product and design intent into reusable
          components, reliable architecture, and intuitive flows. Shipping
          experiences that scale with users and teams while keeping performance
          and maintainability first.
        </Text>
        <div className='flex gap-6 *:flex-1 w-full xl:max-w-1/3 lg:gap-8'>
          <Text className='text-neutral-500 dark:text-neutral-400 text-sm lg:text-base'>
            I help teams align strategy with execution, balancing technical
            depth with user-centered outcomes.
          </Text>
          <Text className='text-neutral-500 dark:text-neutral-400 text-sm lg:text-base'>
            I work at the intersection of design methods and engineering craft.
          </Text>
        </div>
      </div>
    </section>
  );
}
