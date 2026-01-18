import { useRef, useCallback } from "react";
import gsap from "gsap";

export function useSwiperAnimation(onIndexChange: (index: number) => void) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isAnimating = useRef(false);

  const setSliderRef = useCallback((el: HTMLDivElement | null) => {
    sliderRef.current = el;
  }, []);

  const changePeriod = useCallback(
    (nextIndex: number) => {
      if (!sliderRef.current || isAnimating.current) {
        onIndexChange(nextIndex);
        return;
      }

      isAnimating.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      tl.to(sliderRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      });

      tl.add(() => {
        onIndexChange(nextIndex);
      });

      tl.to(sliderRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    [onIndexChange]
  );

  return {
    setSliderRef,
    changePeriod,
  };
}
