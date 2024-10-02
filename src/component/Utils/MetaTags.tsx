import React from "react";
import { metadata } from "../../meta/metadata";

const MetaTags: React.FC = () => {
  React.useEffect(() => {
    document.title = metadata.title.default;

    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const updateLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    updateMeta("description", metadata.description);
    updateMeta("keywords", metadata.keywords.join(", "));
    metadata.authors.forEach((author) => updateMeta("author", author.name));
    updateMeta("creator", metadata.creator);

    updateLink("icon", metadata.icons.icon);
    updateLink("shortcut icon", metadata.icons.shortcut);
    updateLink("apple-touch-icon", metadata.icons.apple);

    Object.entries(metadata.openGraph).forEach(([property, content]) => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", `og:${property}`);
      meta.content =
        typeof content === "string" ? content : JSON.stringify(content);
      document.head.appendChild(meta);
    });

    Object.entries(metadata.twitter).forEach(([name, content]) => {
      updateMeta(`twitter:${name}`, content);
    });

    const robotsContent = [];
    for (const [key, value] of Object.entries(metadata.robots)) {
      if (typeof value === "boolean" && value) {
        robotsContent.push(key);
      }
    }
    const robotsContentString = robotsContent.join(", ");

    updateMeta("robots", robotsContentString);

    Object.entries(metadata.robots.googleBot).forEach(([key, value]) => {
      updateMeta("googlebot", `${key}:${value}`);
    });

    updateLink("canonical", metadata.alternates.canonical);
    Object.entries(metadata.alternates.languages).forEach(([lang, url]) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", lang);
      link.setAttribute("href", url);
      document.head.appendChild(link);
    });
  }, []);

  return null;
};

export default MetaTags;
