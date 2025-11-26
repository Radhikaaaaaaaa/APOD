import { Sparkles } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
}

export function Hero({ onExploreClick }: HeroProps) {
  const today = new Date().toLocaleDateString('en-US', { 
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Starfield Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4DAEFF] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A675FF] opacity-10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Date Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 glass-card rounded-full glow-border">
          <Sparkles className="w-4 h-4 text-[#4DAEFF]" />
          <span className="text-sm text-[#EAF2FF]">Today — {today}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#4DAEFF] via-[#EAF2FF] to-[#A675FF] bg-clip-text text-transparent leading-tight">
          NASA Astronomy Picture of the Day
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-[#94A3B8] mb-12 max-w-2xl mx-auto">
          Explore the universe, one picture at a time. Discover breathtaking cosmic wonders captured by NASA.
        </p>

        {/* CTA Button */}
        <button
          onClick={onExploreClick}
          className="group relative px-8 py-4 bg-gradient-to-r from-[#4DAEFF] to-[#A675FF] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#4DAEFF]/50"
        >
          <span className="relative z-10 flex items-center gap-2 font-semibold text-[#0B0F19]">
            Explore More
            <Sparkles className="w-5 h-5" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#A675FF] to-[#4DAEFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#4DAEFF]/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[#4DAEFF] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
