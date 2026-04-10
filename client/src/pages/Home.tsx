import HeroSection from '@/components/HeroSection';

/**
 * Home Page
 * 
 * Features a scroll-driven hero section with initial load animations
 * and smooth scroll-based car movement using GSAP.
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Additional content below hero section */}
      <div className="min-h-screen bg-background border-t border-border flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>
            Scroll Back Up
          </h2>
          <p className="text-lg text-muted-foreground">
            Watch the car move as you scroll. The animation is driven by your scroll position for a smooth, 
            interactive experience.
          </p>
        </div>
      </div>
    </div>
  );
}
