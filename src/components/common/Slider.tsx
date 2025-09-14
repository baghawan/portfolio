"use client";

import {
  useImperativeHandle,
  forwardRef,
  useCallback,
  useEffect,
  useState,
  useRef,
  ReactNode,
  Fragment,
} from "react";
import { type EmblaOptionsType, type EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/utils/cn";

export interface SliderRef {
  emblaApi: EmblaCarouselType | undefined;
}

interface SliderProps {
  options?: EmblaOptionsType;
  children: ReactNode[];
  className?: string;
  showNavigation?: boolean;
  showDots?: boolean;
}

export const Slider = forwardRef<SliderRef, SliderProps>(
  (
    { options, children, className, showNavigation = false, showDots = false },
    ref
  ) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const dotsRef = useRef<HTMLDivElement>(null);

    // ✅ Expose emblaApi to parent
    useImperativeHandle(ref, () => ({ emblaApi }), [emblaApi]);

    const onSelect = useCallback(() => {
      if (!emblaApi) return;
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
      if (!emblaApi) return;

      onSelect();
      emblaApi.on("select", onSelect);
      emblaApi.on("reInit", onSelect);

      return () => {
        emblaApi.off("select", onSelect);
        emblaApi.off("reInit", onSelect);
      };
    }, [emblaApi, onSelect]);

    return (
      <div className={cn("slider relative overflow-hidden", className)}>
        <div
          className='slider__viewport'
          ref={emblaRef}
        >
          <div className='slider__container flex'>
            {children.map((child, index) => (
              <Fragment key={index}>{child}</Fragment>
            ))}
          </div>
        </div>

        {showNavigation && (
          <>
            <button
              type='button'
              onClick={scrollPrev}
              className={cn(
                "slider__prev absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-white shadow",
                "disabled:opacity-50"
              )}
            >
              Prev
            </button>
            <button
              type='button'
              onClick={scrollNext}
              className={cn(
                "slider__next absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-white shadow",
                "disabled:opacity-50"
              )}
            >
              Next
            </button>
          </>
        )}

        {showDots && (
          <div
            ref={dotsRef}
            className='slider__dots flex gap-2 justify-center mt-4'
          >
            {children.map((_, index) => (
              <button
                key={index}
                type='button'
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  selectedIndex === index ? "bg-black" : "bg-gray-300"
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";
