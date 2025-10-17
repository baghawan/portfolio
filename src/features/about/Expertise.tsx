import { Text } from "@/components/ui";
import { Accordion } from "@base-ui-components/react/accordion";
import { PlusIcon } from "@radix-ui/react-icons";
import { TExpertise } from "./types";

interface ExpertiseProps {
  data: TExpertise[];
}

export default function Expertise({ data }: ExpertiseProps) {
  return (
    <section className='md:border-y md:border-solid md:border-y-neutral-200 md:dark:border-y-neutral-700'>
      <div className='md:flex md:items-start w-full mx-auto md:max-w-(--container--main)'>
        <Text
          variant='heading'
          as='h2'
          className='mb-6 md:flex-1/2 py-4 max-w-(--container--main) md:max-w-none mx-auto'
        >
          Area of Expertise
        </Text>
        <div className='flex-1/2 border-x border-solid border-x-neutral-200 dark:border-x-neutral-700'>
          <Accordion.Root>
            {data.map(({ name, documentId, description, tools }) => (
              <Accordion.Item
                key={documentId}
                className='[&:not(:last-child)]:border-b [&:not(:last-child)]:border-solid [&:not(:last-child)]:border-b-neutral-200 [&:not(:last-child)]:dark:border-b-neutral-700 py-3 px-6'
              >
                <Accordion.Header className='container-fluid'>
                  <Accordion.Trigger className='group w-full flex items-center justify-between cursor-pointer'>
                    <Text
                      variant='subheading'
                      className='text-neutral-400 dark:text-neutral-500 group-data-[panel-open]:text-neutral-800 group-data-[panel-open]:dark:text-neutral-200'
                    >
                      {name}
                    </Text>
                    <PlusIcon
                      width={18}
                      height={18}
                      className='shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 group-data-[panel-open]:rotate-135'
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel className='container-fluid will-change-auto h-[var(--accordion-panel-height)] overflow-hidden text-base transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0'>
                  <div className='pt-4 pb-2 flex gap-6 flex-wrap'>
                    <div className='flex flex-col gap-6'>
                      <Text
                        variant='body'
                        className='text-neutral-500 dark:text-neutral-500'
                      >
                        {description}
                      </Text>
                      <ul className='flex flex-wrap gap-1.5'>
                        {tools.map(({ documentId, name }) => (
                          <li
                            key={documentId}
                            className='text-xs font-semibold uppercase tracking-wider rounded-full py-1 px-2.5 bg-neutral-800 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-800'
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}
