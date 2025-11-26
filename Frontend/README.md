
NASA APOD Explorer — Frontend

This is the React + TypeScript frontend for the NASA APOD Explorer project. It uses the backend
REST API to fetch and display NASA's Astronomy Picture of the Day.

Project Structure:
Frontend/
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
│
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── components/
│       ├── APODCard.tsx
│       ├── DatePicker.tsx
│       ├── Footer.tsx
│       ├── Gallery.tsx
│       ├── Hero.tsx
│       ├── ImageModal.tsx
│       ├── Navbar.tsx
│       │
│       ├── figma/
│       │   └── ImageWithFallback.tsx
│       │
│       └── ui/
│           ├── (All Figma-generated UI components)
│           ├── Button.tsx
│           ├── Card.tsx
│           ├── Input.tsx
│           ├── Layout.tsx
│           └── ...more auto-generated files
│
└── README.md

Installation Guide:
1. Move into frontend folder:
cd frontend
2. Install dependencies:
npm install
4. Configure backend URL:
In src/api/apod.ts:
export const API_BASE = "http://localhost:4000";
5. Start Frontend:
npm run dev
Your app will run at:
http://localhost:3000
  
