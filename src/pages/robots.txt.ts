import type { APIRoute } from "astro";

const SITE_URL = "https://italekseev.ru";

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\nDisallow: /astrobook/\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
