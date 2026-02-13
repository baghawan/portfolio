import Anchor from "@/components/ui/Anchor";
import Card from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils/cn";
import { HomepageWork } from "@/types/home";
import Image from "next/image";

interface FeaturedWorksProps {
  works: HomepageWork[];
}

const getClassName = (i: number) => {
  if (i === 0 || i === 3)
    return "flex-[0_0_100%] md:flex-[0_0_calc(66.6667%-8px)]";
  if (i === 1 || i === 2)
    return "flex-[0_0_100%] md:flex-[0_0_calc(33.3334%-8px)]";
  return "";
};

export default function FeaturedWorks({ works }: FeaturedWorksProps) {
  const renderWorkCard = (work: HomepageWork, i: number) => {
    const imageUrl = work.gallery?.[0]?.url;

    return (
      <Anchor
        key={work.id}
        href={`/works/${work.slug}`}
        className={cn(
          "block h-[250px] lg:h-[340px] xl:h-[500px] rounded-2xl relative overflow-hidden",
          getClassName(i),
        )}
      >
        <Card className="h-full w-full">
          <Image
            src={`${process.env.STRAPI_ASSETS_BASE_URL}${imageUrl}`}
            alt={work.title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='object-cover rounded-lg'
          />
          <div className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 from-10% to-transparent to-90% pt-24'>
            <Text
              variant='heading'
              as='h3'
              className='text-white line-clamp-2 mb-2'
            >
              {work.title}
            </Text>
            <Text
              variant='body'
              as='p'
              className='text-white/80'
            >
              {work.expertise?.name}
            </Text>
            <Text
              variant='caption'
              as='span'
              className='text-white/80'
            >
              {work.year}
            </Text>
          </div>
        </Card>
      </Anchor>
    );
  };

  if (works.length === 0) {
    return null;
  }

  return (
    <section>
      <div className='container-fluid flex items-center justify-between mb-6'>
        <Text
          variant='heading'
          as='h2'
        >
          Featured Works
        </Text>

        <Anchor
          href='/works'
          variant='muted'
        >
          <span>See All</span>
          <ArrowRightIcon
            width={18}
            height={18}
            aria-hidden
          />
        </Anchor>
      </div>
      <div className='container-fluid flex gap-4 flex-wrap'>
        {works.map((work, i) => renderWorkCard(work, i))}
      </div>
    </section>
  );
}
