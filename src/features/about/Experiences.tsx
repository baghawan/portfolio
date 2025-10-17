import { Text } from "@/components/ui";
import { TExperiences } from "./types";

interface ExperiencesProps {
  data: TExperiences[];
}

export default function Experiences({ data }: ExperiencesProps) {
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
        {data.map(({ company, position, startDate, endDate, documentId }) => (
          <li
            key={documentId}
            className='container-fluid flex items-baseline-last gap-6 justify-between py-3 border-b border-solid border-b-neutral-200 dark:border-b-neutral-700'
          >
            <Text
              variant='caption'
              className='text-neutral-500 dark:text-neutral-400'
            >
              {startDate} - {endDate}
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
