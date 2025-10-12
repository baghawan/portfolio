import { Text } from "@/components/ui";
import { WorkList } from "@/features/works";

export default function Work() {
  return (
    <>
      <section className='container-fluid pt-8 xl:pt-12'>
        <Text
          as='h1'
          variant='display'
        >
          Works
        </Text>
      </section>
      <WorkList />
    </>
  );
}
