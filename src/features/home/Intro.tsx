"use client";

import { motion } from "motion/react";
import type { HomeIntro } from "./models";
import { Text } from "@/components/ui";
import { useEntranceMotion } from "@/hooks";

export default function Intro({ title, description }: HomeIntro) {
  const { initial, animate, transition } = useEntranceMotion();

  return (
    <section className='container-fluid md:h-[35dvh] xl:h-[55dvh] md:flex md:items-center'>
      <div className='w-full max-w-[700px] lg:max-w-[960px] mx-auto text-center'>
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition(0.3)}
        >
          <Text
            variant='display'
            as='h1'
            className='mb-6 md:mb-8'
          >
            {title}
          </Text>
        </motion.div>

        <motion.div
          initial={initial}
          animate={animate}
          transition={transition(0.4)}
        >
          <Text
            variant='subheading'
            className='text-neutral-400'
          >
            {description}
          </Text>
        </motion.div>
      </div>
    </section>
  );
}
