import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroSection Component
 * 
 * Design Philosophy: High-Tech Minimalism
 * - Deep charcoal background (#1a1a1a) with electric orange accents (#FF6B00)
 * - Space Mono typography with extreme letter-spacing
 * - Asymmetric layout with off-center car positioning
 * - Smooth scroll-driven car animation with bouncy easing
 */

interface Statistic {
  percentage: string;
  description: string;
  bgColor: string;
}

const statistics: Statistic[] = [
  {
    percentage: '58%',
    description: 'Increase in pick up point use',
    bgColor: 'bg-yellow-300',
  },
  {
    percentage: '23%',
    description: 'Decreased in customer phone calls',
    bgColor: 'bg-blue-400',
  },
  {
    percentage: '27%',
    description: 'Increase in pick up point use',
    bgColor: 'bg-slate-700',
  },
  {
    percentage: '40%',
    description: 'Decreased in customer phone calls',
    bgColor: 'bg-orange-400',
  },
];

export default function HeroSection() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const carContainerRef = useRef<HTMLDivElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Timeline for initial load animations
    const tl = gsap.timeline();

    // Animate headline letters
    if (headlineRef.current) {
      const letters = headlineRef.current.querySelectorAll('.headline-letter');
      tl.fromTo(
        letters,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(1.7)',
        },
        0
      );
    }

    // Animate statistics
    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll('.stat-card');
      tl.fromTo(
        statCards,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        },
        0.3
      );
    }

    // Animate car container
    tl.fromTo(
      carContainerRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      0.2
    );
  }, []);

  useEffect(() => {
    if (!carWrapperRef.current || !carContainerRef.current) return;

    // Scroll-driven car animation
    const animation = gsap.to(carWrapperRef.current, {
      x: 400,
      scrollTrigger: {
        trigger: carContainerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1.2,
        markers: false,
      },
      ease: 'power1.inOut',
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const headline = 'W E L C O M E   I T Z F I Z Z';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center overflow-hidden">
      {/* Full-width headline */}
      <div
        ref={headlineRef}
        className="w-full px-4 md:px-8 lg:px-12 py-20"
      >
        <h1
          className="text-5xl md:text-6xl lg:text-8xl font-bold leading-tight"
        >
          {headline.split('').map((char, idx) => (
            <span
              key={idx}
              className="headline-letter inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>

      {/* Main content area */}
      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 gap-12">
          {/* Car and statistics */}
          <div className="flex flex-col gap-12">
            {/* Car container */}
            <div
              ref={carContainerRef}
              className="relative h-64 md:h-80 bg-orange-500 rounded-lg overflow-hidden flex items-center justify-start"
            >
              <div
                ref={carWrapperRef}
                className="shrink-0 h-full flex items-center px-4"
              >
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663523597680/dSuhMbgxNc3r7CAwgihSSn/car-topdown-EXJNLjcc8PiCH6nhMZB9sK.webp"
                  alt="Orange sports car"
                  className="h-48 md:h-64 w-auto object-contain drop-shadow-lg"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>

            {/* Statistics grid */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-4"
            >
              {statistics.map((stat, idx) => (
                <div
                  key={idx}
                  className={`stat-card ${stat.bgColor} rounded-lg p-6 md:p-8 flex flex-col justify-center transition-all hover:shadow-lg ${
                    stat.bgColor.includes('slate') || stat.bgColor.includes('blue')
                      ? 'text-white'
                      : 'text-black'
                  }`}
                >
                  <div
                    className="text-3xl md:text-4xl font-bold font-mono"
                  >
                    {stat.percentage}
                  </div>
                  <p className="text-sm md:text-base font-medium mt-2 leading-tight">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Scroll to explore
        </p>
        <svg
          className="w-6 h-6 text-accent animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
