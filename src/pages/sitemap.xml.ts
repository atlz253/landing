import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const SITE_URL = "https://italekseev.ru";

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (character) =>
    ({
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    })[character]!,
  );

const toUrlEntry = (path: string, lastmod?: Date) => {
  const url = new URL(path, SITE_URL).href;
  const lastmodTag = lastmod
    ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>`
    : "";

  return `<url><loc>${escapeXml(url)}</loc>${lastmodTag}</url>`;
};

export const GET: APIRoute = async () => {
  const [news, projects] = await Promise.all([
    getCollection("musicNews"),
    getCollection("portfolio"),
  ]);
  const entries = [
    toUrlEntry("/"),
    toUrlEntry("/music/"),
    ...news.map((item) => toUrlEntry(`/music/${item.id}/`, item.data.date)),
    ...projects
      .filter((item) => item.body?.trim())
      .map((item) => toUrlEntry(`/portfolio/${item.id}/`, item.data.date)),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
