import { Rocket } from "lucide-react";

export function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="relative">
              <Rocket className="w-7 h-7 text-[#4DAEFF] rotate-45" />
              <div className="absolute inset-0 blur-md bg-[#4DAEFF] opacity-50 rounded-full" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#4DAEFF] to-[#A675FF] bg-clip-text text-transparent">
              NASA APOD
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("hero")}
              className="text-[#EAF2FF] hover:text-[#4DAEFF] transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4DAEFF] to-[#A675FF] group-hover:w-full transition-all duration-300" />
            </button>
            <button 
              onClick={() => scrollToSection("gallery")}
              className="text-[#EAF2FF] hover:text-[#4DAEFF] transition-colors duration-300 relative group"
            >
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4DAEFF] to-[#A675FF] group-hover:w-full transition-all duration-300" />
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="text-[#EAF2FF] hover:text-[#4DAEFF] transition-colors duration-300 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4DAEFF] to-[#A675FF] group-hover:w-full transition-all duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-[#EAF2FF] hover:text-[#4DAEFF] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
