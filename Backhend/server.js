require("dotenv").config();
const express = require("express");
const axios = require("axios");
const createCache = require("./cache");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

const NASA_BASE = "https://api.nasa.gov/planetary/apod";
const API_KEY = process.env.NASA_API_KEY;
const PORT = process.env.PORT || 4000;

// Cache setup
const cache = createCache({
    max: process.env.CACHE_MAX_ITEMS || 200,
    ttl: (process.env.CACHE_TTL_SECONDS || 3600) * 1000,
});

async function fetchAPOD(params = {}) {
    const url = `${NASA_BASE}?api_key=${API_KEY}&${new URLSearchParams(params)}`;
    const res = await axios.get(url);
    return res.data;
}

// Health Check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", time: Date.now() });
});

// Get today's APOD
app.get("/api/apod/today", async (req, res) => {
    const key = "apod:today";

    if (cache.has(key)) {
        return res.json({ fromCache: true, data: cache.get(key) });
    }

    try {
        const data = await fetchAPOD();
        cache.set(key, data);
        res.json({ fromCache: false, data });
    } catch {
        res.status(500).json({ error: "Failed to fetch APOD" });
    }
});

// Get APOD by date
app.get("/api/apod/date", async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "date required" });

    const key = `apod:${date}`;

    if (cache.has(key)) {
        return res.json({ fromCache: true, data: cache.get(key) });
    }

    try {
        const data = await fetchAPOD({ date });
        cache.set(key, data);
        res.json({ fromCache: false, data });
    } catch {
        res.status(500).json({ error: "Failed to fetch APOD for that date" });
    }
});

// Gallery API
app.get("/api/apod/gallery", async (req, res) => {
    const count = Math.min(50, parseInt(req.query.count || 10));

    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - (count - 1));

    const s = start.toISOString().slice(0, 10);
    const e = end.toISOString().slice(0, 10);

    const key = `gallery:${count}`;

    if (cache.has(key)) {
        return res.json({ fromCache: true, data: cache.get(key) });
    }

    try {
        const url = `${NASA_BASE}?api_key=${API_KEY}&start_date=${s}&end_date=${e}`;
        const resp = await axios.get(url);

        cache.set(key, resp.data);
        res.json({ fromCache: false, data: resp.data });
    } catch {
        res.status(500).json({ error: "Failed to fetch gallery" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
