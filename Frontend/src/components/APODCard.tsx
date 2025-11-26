import { Calendar, Eye } from "lucide-react";

export interface APODData {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: string;
  hdurl?: string;
}

interface APODCardProps {
  apod: APODData;
  onClick?: () => void;
  featured?: boolean;
}

export function APODCard({ apod, onClick, featured = false }: APODCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (featured) {
    return (
      <div className="glass-card rounded-3xl overflow-hidden glow-border group cursor-pointer transition-all duration-500 hover:scale-[1.02] max-w-4xl mx-auto">
        <div className="relative overflow-hidden" onClick={onClick}>
          {apod.media_type === 'video' ? (
            <div className="relative w-full aspect-video bg-black/50">
              <iframe
                src={apod.url}
                title={apod.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <>
              <img
                src={apod.url}
                alt={apod.title}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-60" />
            </>
          )}
          
          {/* Date Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-[#0B0F19]/80 backdrop-blur-md rounded-full border border-[#4DAEFF]/30">
            <Calendar className="w-4 h-4 text-[#4DAEFF]" />
            <span className="text-sm text-[#EAF2FF]">{formatDate(apod.date)}</span>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-3xl mb-4 text-[#EAF2FF] group-hover:text-[#4DAEFF] transition-colors duration-300">
            {apod.title}
          </h3>
          <p className="text-[#94A3B8] mb-6 leading-relaxed">
            {truncateText(apod.explanation, 200)}
          </p>
          <button
            onClick={onClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4DAEFF]/20 to-[#A675FF]/20 border border-[#4DAEFF]/30 rounded-full text-[#EAF2FF] hover:from-[#4DAEFF]/30 hover:to-[#A675FF]/30 transition-all duration-300 group-hover:border-[#4DAEFF]/50"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="glass-card rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#4DAEFF]/20 h-full flex flex-col"
    >
      <div className="relative overflow-hidden">
        {apod.media_type === 'video' ? (
          <div className="relative w-full aspect-video bg-black/50 flex items-center justify-center">
            <div className="text-[#4DAEFF]">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        ) : (
          <>
            <img
              src={apod.url}
              alt={apod.title}
              className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
          </>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0B0F19]/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#4DAEFF]/20 border border-[#4DAEFF]/50 rounded-full">
            <Eye className="w-4 h-4 text-[#4DAEFF]" />
            <span className="text-sm text-[#EAF2FF]">View Details</span>
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-3.5 h-3.5 text-[#4DAEFF]" />
          <span className="text-xs text-[#94A3B8]">{formatDate(apod.date)}</span>
        </div>
        
        <h4 className="text-lg mb-2 text-[#EAF2FF] group-hover:text-[#4DAEFF] transition-colors duration-300 line-clamp-2">
          {apod.title}
        </h4>
        
        <p className="text-sm text-[#94A3B8] line-clamp-3 flex-1">
          {apod.explanation}
        </p>
      </div>
    </div>
  );
}