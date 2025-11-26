NASA APOD Explorer — Backend

This backend provides REST APIs for fetching NASA Astronomy Picture of the Day (APOD) data. It
securely handles NASA API requests using an Express.js server with caching.

Installation Guide:
1. Move into backend folder:
cd backend
2. Install dependencies:
npm install
3. Create .env file (If necessary):
NASA_API_KEY=YOUR_NASA_API_KEY
PORT=4000
CACHE_MAX_ITEMS=200
CACHE_TTL_SECONDS=3600
4. Start Backend Server:
npm run dev

API Endpoints:
- /api/health (GET)
- /api/apod/today (GET)
- /api/apod/date (GET)
- /api/apod/gallery (GET)