// src/components/NewsTicker.jsx
import React, { useEffect, useState, useRef } from "react";
import "./NewsTicker.css";

const PROXY_URL = "/api/news"; // your local server should be proxying at http://localhost:4000/api/news (vite dev proxies to that)
const FALLBACK = [
  { title: "Local civic drive begins this weekend — volunteers needed", url: "https://telugu.way2news.com/", source: "Local" },
  { title: "City council approves green lighting for parks", url: "https://telugu.way2news.com/", source: "City" },
];

export default function NewsTicker() {
  const [items, setItems] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    async function fetchFromProxy() {
      try {
        setUsingFallback(false);
        // full URL (to be safe in dev) - if your server runs on 4000 and Vite on 5173, you can put full URL "http://localhost:4000/api/news"
        const base = (window.location.hostname === "localhost" ? "http://localhost:4000" : "");
        const url = base + PROXY_URL;
        console.log("[NewsTicker] requesting proxy:", url);
        const r = await fetch(url);
        console.log("[NewsTicker] proxy status:", r.status);
        if (!r.ok) throw new Error("proxy returned " + r.status);
        const json = await r.json();
        const arr = (json && json.items) || [];
        if (!mounted.current) return;
        if (!arr.length) throw new Error("proxy returned empty list");
        setItems(arr.slice(0, 20));
      } catch (err) {
        console.error("[NewsTicker] proxy fetch failed:", err);
        if (!mounted.current) return;
        setItems(FALLBACK);
        setUsingFallback(true);
      }
    }

    fetchFromProxy();
    const t = setInterval(fetchFromProxy, 1000 * 60 * 2); // refresh every 2 minutes
    return () => { mounted.current = false; clearInterval(t); };
  }, []);

  if (!items || !items.length) return null;
  const track = [...items, ...items];

  // open actual article in new tab (user wanted real website)
  function openExternal(idx) {
    const article = items[idx];
    if (!article || !article.url) return;
    // ensure absolute url
    let url = article.url;
    if (url.startsWith("/")) url = "https://telugu.way2news.com" + url;
    window.open(url, "_blank", "noopener");
  }

  return (
    <div className="news-ticker" role="region" aria-label="Latest Telugu news">
      <div className="news-inner">
        {usingFallback && <div className="news-warning">Live news unavailable — showing fallback</div>}
        <div className="news-track" aria-hidden>
          {track.map((it, i) => {
            const idx = i % items.length;
            return (
              <button key={i} className="news-item" onClick={() => openExternal(idx)} type="button" title={it.title}>
                <span className="news-dot">•</span>
                <strong>{it.source || "news"}</strong> {it.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
