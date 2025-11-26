import { Calendar, Search } from "lucide-react";
import { useState } from "react";

interface DatePickerProps {
  onSearch: (date: string) => void;
}

export function DatePicker({ onSearch }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      onSearch(selectedDate);
    }
  };

  // Get max date (today) and min date (first APOD: June 16, 1995)
  const maxDate = new Date().toISOString().split('T')[0];
  const minDate = '1995-06-16';

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-12 glow-border relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4DAEFF] opacity-5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A675FF] opacity-5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-[#4DAEFF]/20 to-[#A675FF]/20 border border-[#4DAEFF]/30">
                <Calendar className="w-8 h-8 text-[#4DAEFF]" />
              </div>
              <h2 className="text-3xl sm:text-4xl mb-3 text-[#EAF2FF]">
                Time Travel Through Space
              </h2>
              <p className="text-[#94A3B8]">
                Select any date since June 16, 1995 to explore past cosmic wonders
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="flex-1 relative group">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={minDate}
                  max={maxDate}
                  className="w-full px-6 py-4 bg-[#0F172A]/50 border border-[#4DAEFF]/30 rounded-xl text-[#EAF2FF] placeholder-[#94A3B8] focus:outline-none focus:border-[#4DAEFF] focus:ring-2 focus:ring-[#4DAEFF]/30 transition-all duration-300 group-hover:border-[#4DAEFF]/50 backdrop-blur-sm"
                  placeholder="Select a date"
                />
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: '0 0 20px rgba(77, 174, 255, 0.1)'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={!selectedDate}
                className="px-8 py-4 bg-gradient-to-r from-[#4DAEFF] to-[#A675FF] rounded-xl font-semibold text-[#0B0F19] hover:shadow-lg hover:shadow-[#4DAEFF]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none hover:scale-105 flex items-center justify-center gap-2 group"
              >
                <Search className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Search APOD
              </button>
            </form>

            {/* Info Text */}
            <p className="text-xs text-[#94A3B8] text-center mt-6">
              The APOD archive began on June 16, 1995. Pick any date since then!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
