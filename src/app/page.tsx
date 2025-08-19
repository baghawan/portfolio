import { Text } from "@/components/ui";

export default function Home() {
  return (
    <section className='container-fluid h-[1000px]'>
      <Text
        variant='display'
        as='h1'
        className='mb-6'
      >
        Plan, Build, Optimize, Iterate
      </Text>
    </section>
  );
}
