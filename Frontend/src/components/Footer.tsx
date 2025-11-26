import { Github, Linkedin, Rocket } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="about" className="relative mt-20 border-t border-[#4DAEFF]/20">
      {/* Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4DAEFF] to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Rocket className="w-6 h-6 text-[#4DAEFF] rotate-45" />
              <div className="absolute inset-0 blur-md bg-[#4DAEFF] opacity-50 rounded-full" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-[#EAF2FF] font-semibold">NASA APOD Explorer</p>
              <p className="text-sm text-[#94A3B8]">Powered by NASA API</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card rounded-full border border-[#4DAEFF]/30 hover:border-[#4DAEFF] hover:bg-[#4DAEFF]/10 transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-[#EAF2FF] group-hover:text-[#4DAEFF] transition-colors" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card rounded-full border border-[#4DAEFF]/30 hover:border-[#4DAEFF] hover:bg-[#4DAEFF]/10 transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-[#EAF2FF] group-hover:text-[#4DAEFF] transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 pt-8 border-t border-[#4DAEFF]/10 text-center">
          <p className="text-sm text-[#94A3B8]">
            © {currentYear} NASA APOD Explorer. Data provided by{' '}
            <a 
              href="https://api.nasa.gov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#4DAEFF] hover:text-[#A675FF] transition-colors"
            >
              NASA Open APIs
            </a>
          </p>
          <p className="text-xs text-[#94A3B8] mt-2">
            Explore the universe, one picture at a time
          </p>
        </div>
      </div>
    </footer>
  );
}
