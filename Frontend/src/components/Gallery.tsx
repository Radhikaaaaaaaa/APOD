import { APODCard, APODData } from "./APODCard";
import { Sparkles } from "lucide-react";

interface GalleryProps {
  apods: APODData[];
  onCardClick: (apod: APODData) => void;
}

export function Gallery({ apods, onCardClick }: GalleryProps) {
  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-6 py-2 glass-card rounded-full border border-[#4DAEFF]/30">
            <Sparkles className="w-4 h-4 text-[#4DAEFF]" />
            <span className="text-sm text-[#94A3B8]">Gallery</span>
          </div>
          <h2 className="text-4xl sm:text-5xl mb-4 bg-gradient-to-r from-[#4DAEFF] to-[#A675FF] bg-clip-text text-transparent">
            Recent APOD Gallery
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
            Journey through the cosmos with our curated collection of recent astronomy pictures
          </p>
        </div>

        {/* Gallery Grid */}
        {apods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {apods.map((apod) => (
              <APODCard
                key={apod.date}
                apod={apod}
                onClick={() => onCardClick(apod)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-r from-[#4DAEFF]/20 to-[#A675FF]/20 border border-[#4DAEFF]/30">
              <Sparkles className="w-10 h-10 text-[#4DAEFF]" />
            </div>
            <p className="text-xl text-[#94A3B8]">Loading cosmic wonders...</p>
          </div>
        )}
      </div>
    </section>
  );
}
