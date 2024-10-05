import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import sitemap from "vite-plugin-sitemap";
import {
  metadata,
  generateWebsiteJsonLd,
  generateOrganizationJsonLd,
  generateLocalBusinessJsonLd,
} from "./src/meta/metadata";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "html-transform",
      transformIndexHtml(html) {
        const websiteJsonLd = generateWebsiteJsonLd();
        const organizationJsonLd = generateOrganizationJsonLd();
        const localBusinessJsonLd = generateLocalBusinessJsonLd();
        const robotsContent = Object.entries(metadata.robots)
          .filter(([, value]) => typeof value === "boolean" && value)
          .map(([key]) => key)
          .join(", ");

        return html.replace(
          /<title>(.*?)<\/title>/,
          `
          <title>${metadata.title.default}</title>
          <meta name="description" content="${metadata.description}">
          <meta name="keywords" content="${metadata.keywords.join(", ")}">
          ${metadata.authors.map((author) => `<meta name="author" content="${author.name}">`).join("")}
          <meta name="creator" content="${metadata.creator}">
          <link rel="icon" href="${metadata.icons.icon}">
          <link rel="shortcut icon" href="${metadata.icons.shortcut}">
          <link rel="apple-touch-icon" href="${metadata.icons.apple}">
          <meta property="og:title" content="${metadata.openGraph.title}">
          <meta property="og:description" content="${metadata.openGraph.description}">
          <meta property="og:url" content="${metadata.openGraph.url}">
          <meta property="og:site_name" content="${metadata.openGraph.siteName}">
          <meta property="og:locale" content="${metadata.openGraph.locale}">
          <meta property="og:type" content="${metadata.openGraph.type}">
          ${metadata.openGraph.images
            .map(
              (image) => `
            <meta property="og:image" content="${image.url}">
            <meta property="og:image:width" content="${image.width}">
            <meta property="og:image:height" content="${image.height}">
            <meta property="og:image:alt" content="${image.alt}">
          `,
            )
            .join("")}
          <meta name="twitter:card" content="${metadata.twitter.card}">
          <meta name="twitter:title" content="${metadata.twitter.title}">
          <meta name="twitter:description" content="${metadata.twitter.description}">
          <meta name="twitter:creator" content="${metadata.twitter.creator}">
          <meta name="twitter:site" content="${metadata.twitter.site}">
          <meta name="robots" content="${robotsContent}">
          ${Object.entries(metadata.robots.googleBot)
            .map(
              ([key, value]) =>
                `<meta name="googlebot" content="${key}:${value}">`,
            )
            .join("")}
          <link rel="canonical" href="${metadata.alternates.canonical}">
          ${Object.entries(metadata.alternates.languages)
            .map(
              ([lang, url]) =>
                `<link rel="alternate" hreflang="${lang}" href="${url}">`,
            )
            .join("")}
          <script type="application/ld+json">
            ${JSON.stringify(websiteJsonLd)}
          </script>
          <script type="application/ld+json">
            ${JSON.stringify(organizationJsonLd)}
          </script>
          <script type="application/ld+json">
            ${JSON.stringify(localBusinessJsonLd)}
          </script>
          `,
        );
      },
    },
    sitemap({
      hostname: "https://next-generation.dev",
      dynamicRoutes: ["/", "/*"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
  },
  build: {
    outDir: "dist",
  },
  base: "./",
});
