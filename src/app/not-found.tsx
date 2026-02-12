import Anchor from "@/components/ui/Anchor";
import Text from "@/components/ui/Text";

export default function NotFound() {
  return (
    <div className='container-fluid text-center min-h-[50dvh] md:min-h-[60dvh] xl:min-h-[75dvh] flex flex-col items-center justify-center'>
      <Text
        as='h1'
        variant='display'
        aria-label='404 Page Not Found'
        className='flex items-center gap-1'
      >
        4<span className='inline-block animate-look-around'>👀</span>4
      </Text>
      <Text className='flex flex-col mt-4 mx-auto max-w-sm text-neutral-400 dark:text-neutral-500 mb-4'>
        <span>
          Looks like this page wandered off... or maybe a small typo happened?
        </span>
        <br />
        <span>Either way, it&#39;s not here right now.</span>
      </Text>
      <Anchor
        href='/'
        variant='muted'
        className='bg-(--color-foreground) text-(--color-background) px-4 py-2 text-base font-medium rounded-lg'
      >
        Back to Home
      </Anchor>
    </div>
  );
}
