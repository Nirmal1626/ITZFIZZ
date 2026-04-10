import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carRef.current || !containerRef.current) return;

    // Create a scroll-driven animation for the car
    gsap.to(carRef.current, {
      x: 400, // Move car 400px to the right
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1, // Smooth scrubbing, 1 second lag
        markers: false,
      },
      ease: 'power1.inOut',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return { containerRef, carRef };
};
