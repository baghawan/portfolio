import { Text } from "@/components/ui";
import { Accordion } from "@base-ui-components/react/accordion";
import { PlusIcon } from "@radix-ui/react-icons";

const EXPERTISE = [
  {
    title: "Web Development",
    description:
      "Responsive and performant websites built with modern web technologies. Frontend and backend integration deliver smooth user experiences, scalability, and cross-device compatibility.",
    tools: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "UI/UX Design",
    description:
      "User-centered interfaces designed with a balance of aesthetics and usability. Wireframing, prototyping, and testing ensure intuitive, accessible, and engaging digital experiences.",
    tools: ["Figma", "Sketch"],
  },
  {
    title: "Project Management",
    description:
      "Projects guided from concept to launch with clear communication and structured workflows. Agile methodologies and collaborative tools keep stakeholders aligned, progress tracked, and deliverables on schedule.",
    tools: ["Trello", "Asana", "Jira"],
  },
  {
    title: "Brand & Visual Identity",
    description:
      "Cohesive brand identities crafted to express personality and values. Logos, typography, and marketing materials maintain consistency across digital and print platforms, strengthening recognition and trust.",
    tools: ["Adobe Photoshop", "Illustrator"],
  },
];

export default function Expertise() {
  return (
    <section>
      <div className='container-fluid'>
        <Text
          variant='heading'
          as='h2'
          className='mb-6'
        >
          Area of Expertise
        </Text>
      </div>
      <Accordion.Root>
        {EXPERTISE.map(({ title, description, tools }, index) => (
          <Accordion.Item
            key={index}
            className='border-b border-solid border-b-neutral-200 dark:border-b-neutral-700 py-3'
          >
            <Accordion.Header className='container-fluid'>
              <Accordion.Trigger className='group w-full flex items-center justify-between cursor-pointer'>
                <Text
                  variant='subheading'
                  className='text-neutral-400 dark:text-neutral-500 group-data-[panel-open]:text-neutral-800 group-data-[panel-open]:dark:text-neutral-200'
                >
                  {title}
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
                <div className='flex flex-col gap-6 lg:flex-1/2 lg:grow-0'>
                  <Text
                    variant='body'
                    className='text-neutral-500 dark:text-neutral-500'
                  >
                    {description}
                  </Text>
                  <ul className='flex flex-wrap gap-1.5'>
                    {tools.map((tool, index) => (
                      <li
                        key={index}
                        className='text-xs font-semibold uppercase tracking-wider rounded-full py-1 px-2.5 bg-neutral-800 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-800'
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
