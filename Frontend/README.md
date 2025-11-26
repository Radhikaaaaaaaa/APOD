
NASA APOD Explorer — Frontend

This is the React + TypeScript frontend for the NASA APOD Explorer project. It uses the backend
REST API to fetch and display NASA's Astronomy Picture of the Day.

Project Structure:
frontend/
- index.html
- vite.config.ts
- package.json
- src/
- main.tsx
- App.tsx
- api/
- apod.ts
- components/
- README.md

Installation Guide:
1. Move into frontend folder:
cd frontend
2. Install dependencies:
npm install
3. Configure backend URL:
In src/api/apod.ts:
export const API_BASE = "http://localhost:4000";
4. Start Frontend:
npm run dev
Your app will run at:
http://localhost:3000
  