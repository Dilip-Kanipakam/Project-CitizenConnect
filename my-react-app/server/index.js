// server/index.js (ESM — Node 18+)
import express from "express";
import { load } from "cheerio";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());

let cached = { ts: 0, items: [] };
const CACHE_TTL_MS = 1000 * 60 * 2; // 2min

function absoluteUrl(href) {
  if (!href) return null;
  if (href.startsWith("http")) return href;
  if (href.startsWith("//")) return "https:" + href;
  if (href.startsWith("/")) return "https://telugu.way2news.com" + href;
  return "https://telugu.way2news.com/" + href;
}

app.get("/api/news", async (req, res) => {
  try {
    if (Date.now() - cached.ts < CACHE_TTL_MS && cached.items.length) {
      return res.json({ source: "way2news-proxy", cached: true, items: cached.items });
    }

    const target = "https://telugu.way2news.com/";
    const r = await fetch(target, { headers: { "User-Agent": "news-proxy/1.0 (+https://your-site)" } });
    if (!r.ok) {
      return res.status(502).json({ error: "Bad upstream response", status: r.status });
    }
    const html = await r.text();
    const $ = load(html);

    const found = [];
    const seen = new Set();

    // Try to pick useful anchors; tune later if needed
    $("a").each((i, el) => {
      if (found.length >= 30) return;
      const $el = $(el);
      const href = $el.attr("href") || "";
      const title = ($el.text() || "").trim().replace(/\s+/g, " ");
      if (!title || title.length < 15) return;
      const url = absoluteUrl(href);
      if (!url || seen.has(url)) return;
      seen.add(url);

      // try to find summary or nearby text
      const parent = $el.closest("article, .item, .news-card, .post, li, div");
      let summary = "";
      let time = "";
      if (parent && parent.length) {
        const p = parent.find("p").first();
        summary = (p.text() || "").trim();
        const t = parent.find("time").first();
        time = (t.text() || "").trim();
      }

      found.push({ title, url, summary, time });
    });

    if (!found.length) {
      found.push({
        title: "Unable to parse way2news headlines – check selectors",
        url: "https://telugu.way2news.com/",
        summary: "",
        time: ""
      });
    }

    cached = { ts: Date.now(), items: found };
    res.json({ source: "way2news-proxy", cached: false, items: found });
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "proxy error", message: String(err) });
  }
});

app.listen(PORT, () => console.log(`Way2News proxy running at http://localhost:${PORT}/api/news`));
