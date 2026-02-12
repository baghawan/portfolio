import Image from "next/image";
import Card from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { GalleryImage } from "@/types/gallery";

export default function HeroFold({
  title,
  cover_picture,
}: {
  title: string;
  cover_picture: GalleryImage;
}) {
  const { url, width, height } = cover_picture;
  return (
    <section>
      <div className='container-narrow mb-8 xl:mb-12'>
        <Text
          as='h1'
          variant='heading'
        >
          {title}
        </Text>
      </div>

      <Card className='flex-1 aspect-video md:aspect-[21/7]'>
        <Image
          src={`${process.env.STRAPI_ASSETS_BASE_URL}${url}`}
          alt={title}
          priority
          loading={"eager"}
          width={width}
          height={height}
          sizes='(max-width: 768px) 100vw, 50vw'
          className='object-cover w-full h-full'
        />
      </Card>
    </section>
  );
}
