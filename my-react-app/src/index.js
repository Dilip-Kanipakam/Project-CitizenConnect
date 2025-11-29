// server/index.js
// Run with: NODE_ENV=development node server/index.js
import express from "express";
import fetch from "node-fetch"; // node 18+ has global fetch; if older, install node-fetch
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const GNEWS_KEY = process.env.GNEWS_KEY; // put key in server .env

app.get("/api/news", async (req, res) => {
  try {
    // you can accept query params to filter, e.g. ?lang=en&max=10
    const lang = req.query.lang || "en";
    const max = Math.min(20, parseInt(req.query.max || "10"));
    const url = `https://gnews.io/api/v4/top-headlines?lang=${lang}&max=${max}&token=${GNEWS_KEY}`;
    const r = await fetch(url);
    const json = await r.json();
    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

app.listen(PORT, ()=> console.log(`News proxy running on http://localhost:${PORT}`));
