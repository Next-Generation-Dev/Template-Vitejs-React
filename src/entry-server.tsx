import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";

export function render(): string {
  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );

  return `
    <!doctype html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + TS</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script type="module" src="/src/entry-client.tsx"></script>
      </body>
    </html>
  `;
}
