import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { APODCard, APODData } from './components/APODCard';
import { DatePicker } from './components/DatePicker';
import { Gallery } from './components/Gallery';
import { ImageModal } from './components/ImageModal';
import { Footer } from './components/Footer';

// NASA APOD API configuration


function App() {
  const [todayAPOD, setTodayAPOD] = useState<APODData | null>(null);
  const [galleryAPODs, setGalleryAPODs] = useState<APODData[]>([]);
  const [selectedAPOD, setSelectedAPOD] = useState<APODData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch today's APOD
  useEffect(() => {
    fetchTodayAPOD();
    fetchRecentAPODs();
  }, []);

  
const fetchTodayAPOD = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/apod/today");
    const json = await res.json();
    setTodayAPOD(json.data);
  } catch (error) {
    console.error("Error fetching today APOD:", error);
  }
};

const fetchRecentAPODs = async () => {
  try {
    setLoading(true);

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 8);

    const response = await fetch(
      `http://localhost:4000/api/apod/gallery?start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}`
    );

    const json = await response.json();
    
    const data = json.data;

    if (Array.isArray(data)) {
      setGalleryAPODs(data.reverse().slice(1));
    } else {
      console.error("Gallery API invalid:", data);
    }

  } catch (error) {
    console.error("Error fetching recent APODs:", error);
  } finally {
    setLoading(false);
  }
};

const fetchAPODByDate = async (date: string) => {
  try {
    setLoading(true);

    const res = await fetch(`http://localhost:4000/api/apod/date?date=${date}`);
    const json = await res.json();

    setSelectedAPOD(json.data);

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error("Error fetching APOD by date:", error);
    alert("Failed to fetch APOD for that date.");
  } finally {
    setLoading(false);
  }
};

  const handleExploreClick = () => {
    const element = document.getElementById('today-apod');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Mock data fallback
  const getMockAPOD = (): APODData => ({
    date: new Date().toISOString().split('T')[0],
    title: "The Cosmic Wonder",
    explanation: "This stunning image captures the breathtaking beauty of our universe. From distant galaxies to nearby nebulae, space continues to amaze us with its infinite wonders and mysteries waiting to be discovered.",
    url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200",
    media_type: "image",
    hdurl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=2400"
  });

  const getMockGalleryAPODs = (): APODData[] => {
    const mockData: APODData[] = [];
    const today = new Date();
    
    for (let i = 1; i <= 8; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      mockData.push({
        date: formatDate(date),
        title: `Cosmic Wonder ${i}`,
        explanation: `A fascinating view of the cosmos captured on ${formatDate(date)}. This image showcases the incredible beauty and complexity of our universe.`,
        url: `https://images.unsplash.com/photo-${1419242902214 + i * 100000}?w=800`,
        media_type: "image"
      });
    }
    
    return mockData;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero onExploreClick={handleExploreClick} />

      {/* Today's APOD Section */}
      <section id="today-apod" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl mb-4 bg-gradient-to-r from-[#4DAEFF] to-[#A675FF] bg-clip-text text-transparent">
              Today's Cosmic Discovery
            </h2>
            <p className="text-lg text-[#94A3B8]">
              Your daily dose of astronomical wonder
            </p>
          </div>
          
          {todayAPOD ? (
            <APODCard 
              apod={todayAPOD} 
              onClick={() => setSelectedAPOD(todayAPOD)}
              featured={true}
            />
          ) : (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4DAEFF]" />
            </div>
          )}
        </div>
      </section>

      {/* Date Picker Section */}
      <DatePicker onSearch={fetchAPODByDate} />

      {/* Gallery Section */}
      <Gallery apods={galleryAPODs} onCardClick={setSelectedAPOD} />

      {/* Image Modal */}
      <ImageModal apod={selectedAPOD} onClose={() => setSelectedAPOD(null)} />

      {/* Footer */}
      <Footer />

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0B0F19]/80 backdrop-blur-sm pointer-events-none">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#4DAEFF]" />
            <p className="text-[#EAF2FF]">Loading cosmic data...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;