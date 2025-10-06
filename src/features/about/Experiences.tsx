import { Text } from "@/components/ui";

const EXPERTISE = [
  {
    company: "99 Group",
    position: "Senior Frontend Engineer",
    duration: "2022 - Present",
  },
  {
    company: "RevivalTV",
    position: "Head of Engineering",
    duration: "2022",
  },
];

export default function Experiences() {
  return (
    <section>
      <div className='container-fluid mb-6'>
        <Text
          variant='heading'
          as='h2'
        >
          Experiences
        </Text>
      </div>
      <ul>
        {EXPERTISE.map(({ company, position, duration }, index) => (
          <li
            key={index}
            className='container-fluid flex items-baseline-last gap-6 justify-between py-3 border-b border-solid border-b-neutral-200 dark:border-b-neutral-700'
          >
            <Text
              variant='caption'
              className='text-neutral-500 dark:text-neutral-400'
            >
              {duration}
            </Text>
            <div className='text-right'>
              <Text
                variant='caption'
                className='text-neutral-500 dark:text-neutral-400'
              >
                {company}
              </Text>
              <Text variant='subheading'>{position}</Text>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
