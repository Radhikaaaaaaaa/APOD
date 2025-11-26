import { X, Calendar, ExternalLink } from "lucide-react";
import { APODData } from "./APODCard";
import { useEffect } from "react";

interface ImageModalProps {
  apod: APODData | null;
  onClose: () => void;
}

export function ImageModal({ apod, onClose }: ImageModalProps) {
  useEffect(() => {
    if (apod) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [apod]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (apod) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [apod, onClose]);

  if (!apod) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0B0F19]/95 backdrop-blur-md" />
      
      {/* Modal Content */}
      <div 
        className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl glow-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-3 bg-[#0B0F19]/80 backdrop-blur-md rounded-full border border-[#4DAEFF]/30 hover:border-[#4DAEFF] hover:bg-[#4DAEFF]/10 transition-all duration-300 group"
        >
          <X className="w-6 h-6 text-[#EAF2FF] group-hover:text-[#4DAEFF] transition-colors" />
        </button>

        {/* Image Section */}
        <div className="relative">
          {apod.media_type === 'video' ? (
            <div className="w-full aspect-video bg-black rounded-t-3xl">
              <iframe
                src={apod.url}
                title={apod.title}
                className="w-full h-full rounded-t-3xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={apod.hdurl || apod.url}
              alt={apod.title}
              className="w-full max-h-[60vh] object-contain bg-black/50 rounded-t-3xl"
            />
          )}
          
          {/* Date Badge on Image */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-[#0B0F19]/80 backdrop-blur-md rounded-full border border-[#4DAEFF]/30">
            <Calendar className="w-4 h-4 text-[#4DAEFF]" />
            <span className="text-sm text-[#EAF2FF]">{formatDate(apod.date)}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h2 className="text-3xl sm:text-4xl text-[#EAF2FF]">
              {apod.title}
            </h2>
            {apod.hdurl && (
              <a
                href={apod.hdurl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 p-3 bg-gradient-to-r from-[#4DAEFF]/20 to-[#A675FF]/20 border border-[#4DAEFF]/30 rounded-full hover:from-[#4DAEFF]/30 hover:to-[#A675FF]/30 transition-all duration-300 group"
                title="View HD Image"
              >
                <ExternalLink className="w-5 h-5 text-[#4DAEFF] group-hover:scale-110 transition-transform" />
              </a>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-[#94A3B8] leading-relaxed whitespace-pre-line">
              {apod.explanation}
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-[#4DAEFF]/20 flex flex-wrap gap-4 text-sm text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <span className="text-[#4DAEFF]">Date:</span>
              <span>{formatDate(apod.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#4DAEFF]">Type:</span>
              <span className="capitalize">{apod.media_type}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
