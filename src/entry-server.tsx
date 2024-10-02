import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";
import { metadata } from "./meta/metadata";
import { generateWebsiteJsonLd } from "./meta/metadata";

export function render(): string {
  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );

  const robotsContent = [];
  for (const [key, value] of Object.entries(metadata.robots)) {
    if (typeof value === "boolean" && value) {
      robotsContent.push(key);
    }
  }
  const robotsContentString = robotsContent.join(", ");

  const metaTags = `
    <meta name="description" content="${metadata.description}" />
    <meta name="keywords" content="${metadata.keywords.join(", ")}" />
    ${metadata.authors.map((author) => `<meta name="author" content="${author.name}">`).join("")}
    <meta name="creator" content="${metadata.creator}" />
    <link rel="icon" href="${metadata.icons.icon}" />
    <link rel="shortcut icon" href="${metadata.icons.shortcut}" />
    <link rel="apple-touch-icon" href="${metadata.icons.apple}" />
    <meta property="og:title" content="${metadata.openGraph.title}" />
    <meta property="og:description" content="${metadata.openGraph.description}" />
    <meta property="og:url" content="${metadata.openGraph.url}" />
    <meta property="og:site_name" content="${metadata.openGraph.siteName}" />
    <meta property="og:locale" content="${metadata.openGraph.locale}" />
    <meta property="og:type" content="${metadata.openGraph.type}" />
    ${metadata.openGraph.images
      .map(
        (image) => `
      <meta property="og:image" content="${image.url}" />
      <meta property="og:image:width" content="${image.width}" />
      <meta property="og:image:height" content="${image.height}" />
      <meta property="og:image:alt" content="${image.alt}" />
    `,
      )
      .join("")}
    <meta name="twitter:card" content="${metadata.twitter.card}" />
    <meta name="twitter:title" content="${metadata.twitter.title}" />
    <meta name="twitter:description" content="${metadata.twitter.description}" />
    <meta name="twitter:creator" content="${metadata.twitter.creator}" />
    <meta name="twitter:site" content="${metadata.twitter.site}" />
    <meta name="robots" content="${robotsContentString}" />
    ${Object.entries(metadata.robots.googleBot)
      .map(
        ([key, value]) => `<meta name="googlebot" content="${key}:${value}">`,
      )
      .join("")}
    <link rel="canonical" href="${metadata.alternates.canonical}" />
    ${Object.entries(metadata.alternates.languages)
      .map(
        ([lang, url]) =>
          `<link rel="alternate" hreflang="${lang}" href="${url}" />`,
      )
      .join("")}
  `;

  const jsonLd = generateWebsiteJsonLd();

  return `
    <!doctype html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${metadata.title.default}</title>
        ${metaTags}
        <script type="application/ld+json">
          ${JSON.stringify(jsonLd)}
        </script>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script type="module" src="/src/entry-client.tsx"></script>
      </body>
    </html>
  `;
}
